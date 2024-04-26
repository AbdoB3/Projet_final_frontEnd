import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Services from './Components/Services';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

import LoginForm from './Components/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       
          
        <Navbar />
        <Home/>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} /> */}
      
          {/* Add routes for other pages */}
        {/* </Routes> */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
