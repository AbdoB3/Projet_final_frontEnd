import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/authontifaction/Login';
import Doctorpage from './Components/Doctorpage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Contact from './Components/Contact';
import Registredoctor from './Components/Registredoctor';
import Dossier from './Components/Dossier'
import Doctorspage from './Components/Doctorspage';
import  PatientConsultations from './Components/PatientConsultations';
import AppointmentCalendar from './Components/Calendrier'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
     

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/conatct" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/registerdoctor" element={<Registredoctor/>} />
          <Route path="/doctor/:id" element={<Doctorpage />} />
          <Route path="/doctors" element={<Doctorspage />} />
          <Route path="/dossier" element={<Dossier />} />
          <Route path="/consultations/:patientId" element={<PatientConsultations />} />
          

          {/* Add more routes here as needed */}

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
