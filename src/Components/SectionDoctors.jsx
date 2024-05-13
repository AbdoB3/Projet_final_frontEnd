import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Propsdoctor from './Propsdoctor';

export default function SectionDoctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctorsBySpecialty();
    }, []);

    const fetchDoctorsBySpecialty = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/doctors?limit=4`);
            const doctorsData = response.data.doctors.slice(0, 4);
            setDoctors(doctorsData);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    return (
        <section className="">
            <h1 className="mb-12 text-center font-sans text-5xl font-bold">Nos médecins</h1>
            <div className="flex justify-center"> {/* Use flex to create a horizontal row */}
                {doctors.map((doctor, index) => (
                    <div key={index} className="mx-2"> {/* Add margin to space out items */}
                        <Propsdoctor
                            firstname={doctor.firstname}
                            lastname={doctor.lastname}
                            speciality={doctor.speciality}
                            sexe={doctor.sexe}
                            feePer={doctor.feePer}
                            // imageUrl={doctor.imageUrl}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
