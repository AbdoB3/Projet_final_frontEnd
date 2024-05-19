// SectionDoctors.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropsDoctor from './Propsdoctor'; // Corrected filename

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
            const response = await axios.get(`http://localhost:3000/doctors?limit=4`);
            const doctorsData = response.data.doctors.slice(0, 4);
            setDoctors(doctorsData);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchDoctorsBySpecialty = async (specialty) => {
        try {
            const response = await axios.get(`http://localhost:3000/doctors/speciality/${specialty}`);
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors by specialty:', error);
        }
    };

    return (
        <section id='sectiondoctor'>
            <h1 className="mb-12 text-center font-sans text-5xl font-bold">Nos médecins</h1>
            <div className="flex justify-center">
                {doctors.map((doctor, index) => (
                    <div key={index} className="mx-2">
                        <PropsDoctor
                            id={doctor._id
                                
                            }

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
