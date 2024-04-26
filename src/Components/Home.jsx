import React from 'react'
import Hero from './Hero'
import  Raiting from './Rating';
import Faq from './Faq';
import Workprocess from './Hiw';
import About from './About';
import Services from './Services';
import Contact from './Contact';
export default function Home() {
  return (
    <div>
      <Hero/>
      <About/>
      <Services/>
      <Faq/>


      <Raiting/>
      <Contact/>

    </div>
  )
}
