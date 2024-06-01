// Doctorpage.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { message } from 'antd';
import doctorimg from '../assets/doctor-img02.png';
import Calendrier from './Calendrier';
import Footer from './Footer';
import axios from 'axios';
import Navbar from './Navbar';

const Doctorpage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientId, setPatientId] = useState(localStorage.getItem('patientId'));
  const location = useLocation();

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des détails du médecin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorDetail();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <section className="py-12 sm:py-16">
        <h2 className="text-4xl font-bold text-center mb-7 text-blue-600">Rencontrez votre médecin</h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:flex-1">
              <img className="h-96 w-full object-cover rounded-lg" src={doctorimg} alt="Image du médecin" />
            </div>
            <div className="md:flex-1 mt-5">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{doctor?.firstname} {doctor?.lastname}</h2>
              <p className="text-justify mb-3">{doctor?.description}</p>
              <div className="mb-2"><span className="font-bold">Sexe:</span> {doctor?.sexe}</div>
              <div className="mb-2"><span className="font-bold">Spécialité:</span> {doctor?.speciality}</div>
              <div className="mb-2"><span className="font-bold">Expérience:</span> {doctor?.experience} ans</div>
              <div className="mb-2"><span className="font-bold">Prix:</span> {doctor?.feePer}$</div>
              <Calendrier doctorId={doctor} patientId={patientId} />

            </div>
            <div className="md:flex-1 ml-10 mt-16">
              <h2 className="text-xl font-bold text-gray-800">Numéro de téléphone</h2>
              <p className="text-gray-600 text-sm mb-4">{doctor?.phone}</p>
              <div className="mb-4"><span className="font-bold text-gray-700">Email:</span> <p className="text-gray-600 text-sm">{doctor?.email}</p></div>
              <div className="mb-4"><span className="font-bold text-gray-700">Adresse du cabinet:</span> <p className="text-gray-600 text-sm">{doctor?.address?.city}, {doctor?.address?.state}, {doctor?.address?.country}</p></div>
              <Link to="/doctors/" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-700">Notre médecins</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Doctorpage;