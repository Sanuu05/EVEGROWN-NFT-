import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import { DAppProvider } from "@usedapp/core";

ReactDOM.render(
  <DAppProvider config={{}}>
    <MoralisProvider appId="VqirMjfI4N5NLJ2zPBlwGe4FJLC21TW796s73iTF" serverUrl="https://4v6uoktqpgrs.usemoralis.com:2053/server">
    <App />
    </MoralisProvider>
    </DAppProvider>
  ,
  document.getElementById('root')
);


