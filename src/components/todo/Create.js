import { BrowserRouter, Switch, Route, Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import axios from "axios";
const dotenv = require('dotenv');



const Create = () => {

    const [url, setUrl] = useState('');

    const addUrl = (nombre) => {
      //let cPedidos = Object.assign([], pedidos);
      const short_url = nanoid(6);
      dotenv.config();
      var dbHost = process.env.BACKEND_PORT || 8080

      //first look if the url already exists
      axios.get(`http://localhost:${dbHost}/url`,{ params: { name :  nombre } }
      ).then((res) => {
        console.log("watching data!!!!")
        console.log(res.data);
        //check if json is not empty
        var countKey = Object.keys(res.data).length;
        console.log("countkey");
        console.log(countKey);

        if(countKey == 0){
          //create a new url element
          axios.post(`http://localhost:${dbHost}/url/create`, {
          url : nombre
        }
      )
        .then((result) => {
          console.log("result")
          console.log(result);
          axios.post(`http://localhost:${dbHost}/shorturl/create`, {
            original_url : result.data.id,
            short_url : short_url
          }
        )
          .then((result) => {
            console.log(result);
            console.log(`la url generada es: http://localhost:3000/${short_url}`);
            const disp = document.getElementById("displayUrl");
            disp.innerHTML = `la url generada es: http://localhost:3000/${short_url}`
            
            
          })
          .catch((error) => {
            console.log("There was an error: ", error);
          });
          
        })
        .catch((error) => {
          console.log("There was an error: ", error);
        });
        }
        else{
          //create new short_url with retrieved id
          axios.post(`http://localhost:${dbHost}/shorturl/create`, {
            original_url : res.data.id,
            short_url : short_url
          }
        )
          .then((result) => {
            console.log(result);
            console.log(`la url generada es: http://localhost:3000/${short_url}`);
            const disp = document.getElementById("displayUrl");
            disp.innerHTML = `la url generada es: http://localhost:3000/${short_url}`
            
            
          })
          .catch((error) => {
            console.log("There was an error: ", error);
          });

        }


        });

      //if not, create it
      //if it does, create just the short_url with the id found
  
      
  
      
      
    }

    const handleUrlChange = (event) => {
      let val = event.target.value;
      setUrl(val);
    }
    
    // el evento de creación es envíado al padre
    const handleCreateClick = (event) => {
      addUrl(url);
      setUrl('');
    }


  return (
    <div class="container">
      <label htmlFor="create-form"></label>
      <input 
        type="text" 
        value={url} 
        id="create-form"
        onChange={handleUrlChange}/>
      <input type="button" value="Acortar" onClick={handleCreateClick} />
      <div id="displayUrl"></div>
      
    </div>
  )
}

export default Create;