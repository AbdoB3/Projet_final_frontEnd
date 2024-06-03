import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import AppointmentCalendar from './Calendrier'; 
import doctorimg from '../assets/doctor-img02.png';

const Doctorpage = () => {
  const { id } = useParams(); // doctorId
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const patientId = localStorage.getItem('patientId');

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
              <AppointmentCalendar  doctorId={id} patientId={patientId} doctor={doctor} />
            </div>
            <div className="md:flex-1 ml-10 mt-16">
              <h2 className="text-xl font-bold text-gray-800">Numéro de téléphone</h2>
              <p className="text-gray-600 text-sm mb-4">{doctor?.phone}</p>
              <div className="mb-4"><span className="font-bold text-gray-700">Email:</span> <p className="text-gray-600 text-sm">{doctor?.email}</p></div>
              <div className="mb-4"><span className="font-bold text-gray-700">Adresse du cabinet:</span> {doctor?.address}</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Doctorpage;
