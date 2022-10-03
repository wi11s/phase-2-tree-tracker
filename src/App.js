import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link } from "react-router-dom"
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Map from './Map';
import Error from './Error';
import Form from './Form';


function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/map"> Map </Link>
        <Link to="/form"> Form </Link>

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="map" element={<Map />} />
        <Route path="form" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
