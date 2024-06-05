// SectionDoctors.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropsDoctor from './Propsdoctor';

export default function SectionDoctors({ searchTerm }) {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            fetchDoctorsBySpecialty(searchTerm);
        } else {
            fetchDoctors();
        }
    }, [searchTerm]);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/doctors/filter`);
            const doctorsData = response.data.doctors;
            const activeDoctors = doctorsData.filter(doctor => doctor.state === 'active').slice(0, 3);
            setDoctors(activeDoctors);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };
    

    const fetchDoctorsBySpecialty = async (specialty) => {
        try {
            const response = await axios.get(`http://localhost:3000/doctors/speciality/${specialty}`);
            const activeDoctors = response.data.filter(doctor => doctor.state === 'active');
            setDoctors(activeDoctors);
        } catch (error) {
            console.error('Error fetching doctors by specialty:', error);
        }
    };

    return (
        <section id='sectiondoctor'>
            <h1 className="mb-12 text-center font-sans text-5xl font-bold mt-10">Nos médecins</h1>
            <div className="flex justify-center">
                {doctors.map((doctor, index) => (
                    <div key={index} className="mx-2">
                        <PropsDoctor
                            id={doctor._id}
                            firstname={doctor.firstname}
                            lastname={doctor.lastname}
                            speciality={doctor.speciality}
                            sexe={doctor.sexe}
                            feePer={doctor.feePer}
                            description={doctor.description}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
