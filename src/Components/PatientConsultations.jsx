import React, { useEffect, useState } from 'react';
import { Card, List, message as antdMessage } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientConsultations = () => {
  const { patientId } = useParams();
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/consultation/patient/${patientId}`);
        setConsultations(response.data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
        antdMessage.error('Error fetching consultations. Please try again.');
      }
    };

    fetchConsultations();
  }, [patientId]);

  return (
    <div className="bg-white rounded-3xl mx-4 md:mx-auto max-w-screen-md border-2 border-gray-800 mt-16">
      <div className="px-8 py-6 md:p-10">
        <h1 className="text-4xl md:text-5xl font-medium leading-tight text-gray-800 mb-6">
          Your Consultations
        </h1>
        <List
          itemLayout="horizontal"
          dataSource={consultations}
          renderItem={(item) => (
            <List.Item>
              <Card title={`Consultation with Dr. ${item.doctor_name}`} style={{ width: '100%' }}>
                <p><strong>Date:</strong> {item.date_consultation}</p>
                <p><strong>Time:</strong> {item.time}</p>
                <p><strong>Symptoms:</strong> {item.motif_consultation.join(', ')}</p>
                <p><strong>Type:</strong> {item.consultation_type}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default PatientConsultations;
