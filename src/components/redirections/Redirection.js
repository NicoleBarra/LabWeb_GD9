import { BrowserRouter, Switch, Route, Link, useParams } from "react-router-dom";
import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
const dotenv = require('dotenv');




const Redirection= () => {

    var { redirectParam } = useParams();
    
    var url = "";
    dotenv.config();
    var dbHost = process.env.BACKEND_PORT || 8080



    useEffect(() => {

      //check if it's a + in the end
      console.log("last element")
      console.log(redirectParam.charAt(redirectParam.length - 1))
      if(redirectParam.charAt(redirectParam.length - 1) === "+"){
        console.log(redirectParam)
        redirectParam = redirectParam.substr(0,redirectParam.length - 1);
        console.log(redirectParam)

        axios(`http://localhost:${dbHost}/short_url/${redirectParam}`).then((res) => {
        console.log(res.data);
        url = res.data.original_url;
        
        axios(`http://localhost:${dbHost}/url`,{ params: { url_id :  url }}
        ).then((res) => {
        console.log(res.data);
        var visits = res.data.visits;
        url = res.data.url;
        var disp = document.getElementById("displayUrl")
        var lin1 = document.createElement("p");
        var lin2 = document.createElement("p");
        var lin3 = document.createElement("p");

        lin1.innerHTML = `La URL original fue: ${url}`
        lin2.innerHTML = `La URL generada es: http://localhost/${redirectParam}`
        lin3.innerHTML = `Cantidad de veces que se ha redireccionado: ${visits}`

        disp.appendChild(lin1);
        disp.appendChild(lin2);
        disp.appendChild(lin3);
        
        });
      });

      }

      //redirect. add one redirect to the original url
      else{
        //get short_url
        axios(`http://localhost:${dbHost}/short_url/${redirectParam}`).then((res) => {
        console.log(res.data);
        url = res.data.original_url;
        //get original url
        axios.get(`http://localhost:${dbHost}/url`, { params: { url_id :  url }}).then((res) => {
        console.log(res.data);
        url = res.data.url;
        //add visit
        axios.post(`http://localhost:${dbHost}/url/update`, {
            id : res.data.id,
            visits : res.data.visits + 1
          }
        )
          .then((result) => {
            
            
          })
          .catch((error) => {
            console.log("There was an error: ", error);
          });
        window.location.href = url;
      });
      });
    }
      
    }, []);

    return(
      <div>
      <h2>Redirecting...</h2>
      <div id="displayUrl"></div>
    </div>
    
    )}

      export default Redirection;

