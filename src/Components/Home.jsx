import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import Raiting from './Rating';
import Faq from './Faq';
import Workprocess from './Hiw';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

export default function Home() {
  // State to hold the data fetched from the server
  const [consultationData, setConsultationData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/consultation/');
        setConsultationData(response.data);
        console.log('Fetched consultation data:', response.data);  g
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch data function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div id='home'>
      <Navbar /> 
      <Hero/>
      <About/>
      <Services/>
      <Faq/>
      <Raiting/>
      <Contact/>
      <Footer /> 
    </div>
  );
}
