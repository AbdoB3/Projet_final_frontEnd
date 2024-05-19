import React, { useState, useEffect  ,useRef} from 'react';
import Hero from './Hero';
import Rating from './Rating';
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
    const [suggestions, setSuggestions] = useState([]);
    const aboutRef = useRef(null);
    
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/speciality'); // Adjust the API endpoint as needed
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };

        fetchSuggestions();
    }, []);

    const handleSearchSubmit = (searchTerm) => {
        // No need to fetch doctors here, it's handled in SectionDoctors
    };

    return (
        <div id='/'>
            <Navbar />
            <Hero handleSearchSubmit={handleSearchSubmit}
             handleSearchInputChange={handleSearchInputChange} 
             suggestions={suggestions} />
            <SectionDoctors searchTerm={searchTerm} /> 
            <About  aboutRef={aboutRef}/>
            <Services />
            <Faq />
            <Rating />
            <Contact />
            <Footer />
        </div>
    );
}
