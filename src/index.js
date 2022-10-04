import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './components/App.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>, document.getElementById("root")
)

