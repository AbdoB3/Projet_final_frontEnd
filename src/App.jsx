import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/authontifaction/Login';
import Doctorspage from './Components/Doctorspage'
import Doctorpage from './Components/Doctorpage'


function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<Doctorspage/>} />
          <Route path="/doctor" element={<Doctorpage/>} />
          {/* Add more routes here as needed */}
        </Routes>
 
      </div>
    </BrowserRouter>
  );
}

export default App;
