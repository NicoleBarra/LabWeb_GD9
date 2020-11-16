  
import React, {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import Create from './components/todo/Create';
import Redirection from './components/redirections/Redirection';
import './App.css';
import { BrowserRouter, Switch, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
const dotenv = require('dotenv');

dotenv.config();



function App() {

  var dbHost = process.env.BACKEND_PORT || 8080
  const [pedidos, setPedidos] = useState([]);


  useEffect(() => {
  }, []);

  

  const fetchPedidos = async () => {
    await axios(`http://localhost:${dbHost}/`).then((res) => {
      console.log(res.data);
      setPedidos(res.data);
    });
    //setPedidos(result.data);
  };



  const addUrl = (nombre) => {
    //let cPedidos = Object.assign([], pedidos);
    const short_url = nanoid(6);

    axios.post(`http://localhost:${dbHost}/url/create`, {
        url : nombre
      }
    )
      .then((result) => {
        console.log(result);
        
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });

    axios.post(`http://localhost:${dbHost}/shorturl/create`, {
        original_url : nombre,
        short_url : short_url
      }
    )
      .then((result) => {
        console.log(result);
        console.log(`la url generada es: http://localhost:3000/${short_url}`);
        
        
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
    
  }

  const updateEstado = async (elId,sourceId,targetId) => {
    await axios
      .post(`http://localhost:${dbHost}/cambioestado/create`, { 
        pedido: elId,
        estadoAnterior: sourceId,
        estadoPosterior: targetId
      })
      .then((res) => {
        console.log("Cambio Estado creado");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePedido = async (elId,targetId) => {
    await axios
      .post(`http://localhost:${dbHost}/pedido/update`, { 
        id: elId,
        nuevoEstado:targetId 
      })
      .then((res) => {
        console.log("Pedido actualizado");
        console.log(targetId);
      })
      .catch((err) => {
        console.log(err);
      });
  };





  return (
  <BrowserRouter>
    <div>
        <Switch>
        <Route exact path="/">
            
            <Create addUrl={addUrl}/>
      
        </Route> 
        <Route path="/:redirectParam" >
          <Redirection/>
        </Route> 
        </Switch>
      
    </div>
  </BrowserRouter>
);
}

export default App;

