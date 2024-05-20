import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import Calendrier from './Calendrier';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import Navbar from './Navbar';

const Doctorpage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du médecin:', error);
        setError('Erreur lors de la récupération des détails du médecin'); // Set error state
      } finally {
        setIsLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchDoctorDetail();
  }, [id]);

  const [activeButton, setActiveButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Navbar/>
      <section className="py-12 sm:py-16" 
    >
        <h2 className="text-4xl font-bold  text-center mb-7
         text-blue-600" >
          Rencontrez votre médecin
        </h2>
        <div className="container mx-auto px-4">


          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:flex-1">
              <div className="flex items-center justify-center mb-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <img className="w-full h-full object-cover"
                    src= {doctor?.imageUrl}
                    alt="Image du médecin" />
                </div>
              </div>
            </div>

            <div className="md:flex-1 mt-5">

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">

                <span>Dr : </span>
                {doctor?.firstname} {doctor?.lastname}</h2>
              <p className=" subpixel-antialiased text-justify mb-3">
                {doctor?.description}</p>
              <div className="flex mb-2">
                <div className="mr-4 mb-2">
                  <span className="font-bold  ">Sexe:</span>
                  <span className="  ml-2">{doctor?.sexe}</span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="mr-4 mb-2">
                  <span className="font-bold ">Spécialité:</span>
                  <span className="  ml-1">{doctor?.speciality}</span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="mr-4">
                  <span className="font-bold  mb-2">Expérience:</span>
                  <span className="ml-1">{doctor?.experience} ans</span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="mr-4 mb-2">
                  <span className="font-bold mb-2  ">Prix:</span>
                  <span className=" ml-1">{doctor?.feePer}$</span>
                </div>
              </div>

              <div className="mb-3">
                <button type="button" onClick={showModal} className="bg-indigo-500 w-900
               dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-700
                dark:hover:bg-gray-700 w-1/2 px-2">Consultez</button>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <Calendrier />
                </Modal>
              </div>

            </div>
            <div className="md:flex-1 ml-10 mt-16 ">
              <h2 className="text-xl font-bold text-gray-800">Numéro de téléphone</h2>
              <p className="text-gray-600 text-sm mb-4">{doctor?.phone}</p>
              <div className="mb-4">
                <span className="font-bold text-gray-700">Email:</span>
                <p className="text-gray-600  text-sm">{doctor?.email}</p>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700">Adresse du cabinet:</span>
                <p className="text-gray-600  text-sm">{doctor?.address?.city}, {doctor?.address?.state}, {doctor?.address?.country}</p>
              </div>
              <div className="" style={{marginTop:'40px'}}>

                <button type="button" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                  py-2 px-4 rounded-full font-bold hover:bg-indigo-700
                dark:hover:bg-gray-700 px-2" >
                  <span>Notre médecine</span>
                  <span><FontAwesomeIcon icon={faArrowRight} className="ml-2" /></span>
                </button>
              </div>
            </div>


          </div>
        </div>
      </section>
      <Footer></Footer>


    </>
  );
};

export default Doctorpage;
