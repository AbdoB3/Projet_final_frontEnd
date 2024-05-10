import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/authontifaction/Login';
import Workprocess from './Components/Registre';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/registre" element={<Workprocess/>} />
          
        </Routes>
 
      </div>
    </BrowserRouter>
  );
}

export default App;
