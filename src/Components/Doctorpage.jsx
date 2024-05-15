import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import Calendrier from './Calendrier';
import Footer from './Footer';
import axios from 'axios';

const Doctorpage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/doctors/${id}`);
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
      <section className="py-12 sm:py-16 dark:bg-gray-800" style={{height:'100vh'}}>
      <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-7">
  Rencontrez votre médecin
</h2>
        <div className="container mx-auto px-4">
     

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:flex-1">
              <div className="flex items-center justify-center mb-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <img className="w-full h-full object-cover" src="https://unsplash.com/photos/701-FJcjLAQ/download?force=true&w=640" alt="Image du médecin" />
                </div>
              </div>
            </div>

            <div className="md:flex-1 mt-10">
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

                <span>Dr : </span>
                {doctor?.firstname} {doctor?.lastname}</h2>
              <p className=" dark:text-gray-300  mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt.</p>
              <div className="flex mb-2">
                <div className="mr-4 mb-2">
                  <span className="font-bold  ">Sexe:</span>
                  <span className=" dark:text-gray-300 ml-1">{doctor?.sexe}</span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="mr-4">
                  <span className="font-bold dark:text-gray-300">Spécialité:</span>
                  <span className=" dark:text-gray-300 ml-1">{doctor?.speciality}</span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="mr-4">
                  <span className="font-bold  dark:text-gray-300">Expérience:</span>
                  <span className="dark:text-gray-300 ml-1">{doctor?.experience} ans</span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="mr-4">
                  <span className="font-bold  ">Prix:</span>
                  <span className="dark:text-gray-300 ml-1">${doctor?.feePer}</span>
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <span className="font-bold text-gray-700 dark:text-gray-300 mb-2">Choisissez votre type:</span>
                <div className="flex -mx-2">
                  <div className="w-1/2 px-2">
                    <button className={`w-full py-2 px-4 rounded-full font-bold ${activeButton === 'video' ? 'bg-gray-900 dark:bg-gray-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800'}`} onClick={() => handleButtonClick('video')}>
                      video
                    </button>
                  </div>
                  <div className="w-1/2 px-2">
                    <button className={`w-full py-2 px-4 rounded-full font-bold ${activeButton === 'cabinet' ? 'bg-gray-900 dark:bg-gray-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800'}`} onClick={() => handleButtonClick('cabinet')}>
                      Cabinet
                    </button>
                  </div>

                </div>
              </div>
            </div>
            <div className="md:flex-1 ml-10 mt-10  ">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Numéro de téléphone</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{doctor?.phone}</p>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Email:</span>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{doctor?.email}</p>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Adresse du cabinet:</span>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{doctor?.address?.city}, {doctor?.address?.state}, {doctor?.address?.country}</p>
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

          </div>
        </div>
      </section>


    </>
  );
};

export default Doctorpage;
