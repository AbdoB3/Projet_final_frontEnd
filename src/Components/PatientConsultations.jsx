import React, { useEffect, useState } from 'react';
import { Card, List, message as antdMessage } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PatientConsultations = () => {
  const { patientId } = useParams();
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/consultation/patient/${patientId}`);
        console.log(response.data)
        setConsultations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des consultations :', error);
        antdMessage.error('Erreur lors de la récupération des consultations. Veuillez réessayer.');
      }
    };

    fetchConsultations();
  }, [patientId]);

  return (
    <>
      <Navbar />
      <div className="bg-white rounded-3xl mx-4 md:mx-auto max-w-screen-md border-2 border-[#818cf8] mt-16 ">
        <div className="px-8 py-6 md:p-10">
          <h1 className="text-2xl md:text-2xl text-center font-medium leading-tight text-gray-800 mb-6">
            Vos Consultations
          </h1>

          {consultations.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={consultations}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={
                      <span className='text-blue-600/75'>
                        Consultation avec le Dr. {item.doctor_id.firstname} {item.doctor_id.lastname}
                      </span>
                    }
                    style={{ width: '100%' }}
                  >
                    <p><strong>Date :</strong> {item.date_consultation}</p>
                    <p><strong>Heure :</strong> {item.time}</p>
                    <p><strong>Symptômes :</strong> {item.motif_consultation.join(', ')}</p>
                    <p><strong>Type de Consultation :</strong> {item.consultation_type}</p>
                    <b></b>
                    <button style={{ marginTop: '10px' }}
                      type="button" class="text-white bg-gradient-to-r  mt-
                    from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Payer maintenant</button>
                  </Card>
                </List.Item>
              )}
            />
          ) : (
            <p className='text-center'> Vous avez Aucune consultation </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientConsultations;
