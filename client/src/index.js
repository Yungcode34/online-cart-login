
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "gestalt/dist/gestalt.css";
import registerServiceWorker from './registerServiceWorker';

const TOKEN_KEY = 'jwt';

export const setToken = (value, tokenKey = TOKEN_KEY) => {
        if(localStorage){
            localStorage.setItem(tokenKey, JSON.stringify(value))
        }
    }

    export const getToken = (tokenKey = TOKEN_KEY) => {
        if(localStorage && localStorage.getItem(tokenKey)){
            return JSON.parse(localStorage.getItem(tokenKey));
        }
        return null;
    }
    export const clearToken = (tokenKey = TOKEN_KEY) => {
        if(localStorage){
            localStorage.removeItem(tokenKey)
        }
    }
    //THIS WILL BE USED WHEN CART IS FINISHED
    
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));
    registerServiceWorker();

    if (module.hot) {
        module.hot.accept();
      }