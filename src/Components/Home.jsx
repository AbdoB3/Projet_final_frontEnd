import React from 'react'
import Hero from './Hero'
import  Raiting from './Rating';
import Faq from './Faq';
import Workprocess from './Hiw';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';
export default function Home() {
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
  )
}
