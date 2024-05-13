import React, { useState } from 'react';
import Hero from './Hero';
import Raiting from './Rating';
import Faq from './Faq';

import About from './About';
import Services from './Services';
import Specialists from './Specialists';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import MyComponent from './MyComponent'; 
import SectionDoctors from './SectionDoctors';


export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState([]);

    const fetchDoctorsBySpecialty = async (specialty) => {
        try {
            const response = await axios.get(`http://localhost:3002/doctors/speciality/${specialty}`);
            setDoctors(response.data);
            console.log('-------------',response.data)
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (searchTerm) => {
        fetchDoctorsBySpecialty(searchTerm);
    };

    return (
        <div id='home'>
            <Navbar />
            <Hero handleSearchSubmit={handleSearchSubmit} handleSearchInputChange={handleSearchInputChange} />

            <MyComponent doctors={doctors} />
            <SectionDoctors/>
            <About />
            <Services />
            <Faq />
            <Raiting />
            <Contact />
            <Footer />
       
            
        </div>
    );
}

