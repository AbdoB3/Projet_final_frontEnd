// Home.js
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
import SectionDoctors from './SectionDoctors';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (searchTerm) => {
        // No need to fetch doctors here, it's handled in SectionDoctors
    };

    return (
        <div id='home'>
            <Navbar />
            <Hero handleSearchSubmit={handleSearchSubmit} handleSearchInputChange={handleSearchInputChange} />
            <SectionDoctors searchTerm={searchTerm} /> {/* Pass searchTerm as prop */}
            <About />
            <Services />
            <Faq />
            <Raiting />
            <Contact />
            <Footer />
        </div>
    );
}
