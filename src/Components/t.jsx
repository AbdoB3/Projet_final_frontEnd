import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import Calendrier from './Calendrier';
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
        const response = await axios.get(`http://localhost:3002/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor detail:', error);
        setError('Error fetching doctor details');
      } finally {
        setIsLoading(false);
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
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">


          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg">
                    <img class="h-full w-full max-w-full object-cover" src="https://source.unsplash.com/random
                  " alt="Image Description" />
                  </div>
                </div>

                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                  <div className="flex flex-row items-start lg:flex-col">
                    <button type="button" class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
                      <img class="h-full w-full object-cover" src="https://source.unsplash.com/random" alt="Image 1" />
                    </button>


                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">  {doctor?.firstname} {doctor?.lastname}</h1>

              <div className="mt-5 flex items-center">
                <div className="flex items-center">
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 
                1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0
                 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-
                 .38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371
                 1.24.588 
                1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0
                 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 
                1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 
                0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1
                .81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                </div>


              </div>

              <h2 className="mt-8 text-base text-gray-900">Email:</h2>
              <span className="text-black rounded-lg font-bold">{doctor?.email}</span>
              <h2 className="mt-8 text-base text-gray-900">Phone number</h2>
              <span className="text-black rounded-lg font-bold">{doctor?.phone}</span>
              <h2 className="mt-8 text-base text-gray-900">Sexe:</h2>
              <span className="text-black rounded-lg font-bold">{doctor?.sexe}</span>
              <h2 className="mt-8 text-base text-gray-900">Experience</h2>
              <span className="text-black rounded-lg font-bold">{doctor?.experience} ans</span>



              <div className="mt-10 flex flex-col items-center
               justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold">${doctor?.feePer}</h1>
                  <span className="text-base">/Hour</span>
                </div>

                <button type="button" className="inline-flex items-center justify-center 
                rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center 
                text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">

                  Consoultation
                </button>

              </div>


            </div>

            <div className="lg:col-span-3">
              <div className="border-b border-gray-300">
                <nav className="flex gap-4">
                  <a href="#" title="" className="border-b-2 border-gray-900 py-4 text-sm t
                  ext-gray-900 hover:border-gray-400 hover:text-gray-800 font-bold">Description</a>


                </nav>
              </div>

              <div className="mt-8 flow-root sm:mt-12">
             
                <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium nesciunt fuga.</p>


              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
};



























export default Doctorpage;
