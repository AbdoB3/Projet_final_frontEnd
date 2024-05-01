

import { BrowserRouter, Routes, Route} from 'react-router-dom'; // Import necessary components from react-router-dom

import Navbar from './Components/Navbar'; // Import your Navbar component
import Home from './Components/Home'; // Import your Home component
import Contact from './Components/Contact';
import  Footer from './Components/Footer';

import Services from './Components/Services.jsx';
import About from './Components/About.jsx';

import Faq from './Components/Faq.jsx';

import Specialists from './Components/Specialists.jsx'
import Doctorpage from './Components/Doctorpage.jsx'

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
          <Route path="/doctors" element={<Doctorpage />} />
        </Routes> 
        <About/>
        <Services/>
        <Specialists />
        <Faq/>
        <Footer/>
      </div>
     </BrowserRouter>


  );
}

export default App;