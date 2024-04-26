import React from 'react';
import Hero from './Components/Hero';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Import necessary components from react-router-dom

import Navbar from './Components/Navbar'; // Import your Navbar component
import Home from './Components/Home'; // Import your Home component
import About from './Components/About'; // Import your About component
import Services from './Components/Services'; // Import your Services component

import Contact from './Components/Contact'; // Import your Contact component
import  Footer from './Components/Footer';
import LoginForm from './Components/LoginForm';

import Services from './Components/Services.jsx'
import Faq from './Components/Faq.jsx'
// import Specialists from './Components/Specialists.jsx'
import About from './Components/About.jsx'

function App(){
	return(
    <div>
      <Services />
      <Faq />
      <About />
    </div>
  );
}

export default App;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar  />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes> 
        <Footer/>
      </div>
     </BrowserRouter>


  );
}

export default App;
