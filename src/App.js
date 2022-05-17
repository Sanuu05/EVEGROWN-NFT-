import React from 'react';
import './App.css';

import MyRouts from './routers/routes'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  console.log('ddd',process.env.ADDRESS)


  return (
    <div className="mainapp">
     
      <Router>
      <MyRouts />
      </Router>
    </div>
  );
}

export default App;