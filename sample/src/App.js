import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import ListDetails from './components/ListDetails';
import InsertDetails from './components/InsertDetails';
import UpdateDetails from './components/UpdateDetails';
import InsertToro from './components/InsertToro';


function App() {
  return (<div>
    <Router>
      <Header />
    </Router>
  </div>
  );
}

export default App;
