import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/authontifaction/Login';
import Doctorpage from './Components/Doctorpage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/:id" element={<Doctorpage />} />
          {/* Add more routes here as needed */}
      
        </Routes>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
