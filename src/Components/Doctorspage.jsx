import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RadioButtonsGroup = ({ selectedGender, setSelectedGender }) => {
  return (
    <div className="border rounded-md p-4 w-full mx-auto max-w-2xl bg-[#F2F4FF] mt-5">
      <h4 className="text-lg lg:text-2xl font-semibold">Genre</h4>
      <div>
        <label className="flex bg-gray-300 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
          <input
            type="radio"
            id="homme"
            name="gender"
            value="homme"
            checked={selectedGender === 'homme'}
            onChange={() => setSelectedGender('homme')}
          />
          <i className="pl-2">Homme</i>
        </label>
        <label className="flex bg-gray-300 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
          <input
            type="radio"
            id="femme"
            name="gender"
            value="femme"
            checked={selectedGender === 'femme'}
            onChange={() => setSelectedGender('femme')}
          />
          <i className="pl-2">Femme</i>
        </label>
      </div>
    </div>
  );
};

const SpecialiteButtonGroup = ({ selectedSpeciality, setSelectedSpeciality, specialities }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-100 shadow-md rounded-md p-6">
        <h3 className="text-lg font-bold mb-4">Spécialité</h3>
        <div className="space-y-2">
          {specialities.map((speciality) => (
            <div key={speciality._id} className="mb-2 flex items-start">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="speciality"
                  value={speciality.nom}
                  checked={selectedSpeciality === speciality.nom}
                  onChange={() => setSelectedSpeciality(speciality.nom)}
                  className="form-radio text-secondary-500 h-5 w-5"
                />
                <span className="ml-2">{speciality.nom}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DoctorGrid = ({ doctors }) => {
  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
    >
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor._id}
          id={doctor._id}
          imageUrl={doctor.imageUrl || 'src/assets/Doctor-rafiki.png'}
          firstname={doctor.firstname}
          lastname={doctor.lastname}
          speciality={doctor.speciality}
        />
      ))}
    </section>
  );
};

const DoctorCard = ({ id, imageUrl, firstname, lastname, speciality }) => (
  <div className="w-72 mb-1 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
    <Link to={`/doctor/${id}`}>
      <img
        src={imageUrl}
        alt="Doctor"
        className="h-80 w-72 object-cover rounded-t-xl"
      />
      <div className="px-4 py-3 w-72">
        <span className="text-lg font-bold text-black truncate block capitalize">
          {firstname} {lastname}
        </span>
        <p className="text-gray-400 mr-3 uppercase text-xs">{speciality}</p>
      </div>
    </Link>
  </div>
);

const Pagination = ({ currentPage, setCurrentPage, totalDoctors, doctorsPerPage }) => {
  const totalPages = Math.ceil(totalDoctors / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center">
      <nav className="bg-gray-200 rounded-full px-4 py-2">
        <ul className="flex text-gray-600 gap-4 font-medium py-2">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`rounded-full px-4 py-2 ${
                  currentPage === index + 1
                    ? 'bg-white'
                    : 'hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out'
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [doctorsPerPage] = useState(3);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:3000/doctors/filter', {
          params: {
            gender: selectedGender,
            speciality: selectedSpeciality,
            state: 'active',
            page: currentPage,
            limit: doctorsPerPage
          }
        });

        const doctors = res.data.doctors;
        if (Array.isArray(doctors)) {
          setDoctors(doctors.filter(doctor => doctor.state === 'active'));
        } else {
          console.error('Structure de réponse inattendue:', res.data);
          setDoctors([]); 
        }
        setTotalDoctors(res.data.total);
      } catch (error) {
        console.error('Erreur lors de la récupération des médecins:', error);
      }
    };

    fetchDoctors();
  }, [selectedGender, selectedSpeciality, currentPage, doctorsPerPage]);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const res = await axios.get('http://localhost:3000/speciality');
        setSpecialities(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des spécialités:', error);
      }
    };

    fetchSpecialities();
  }, []);

  return (
    <div className="bg-indigo-100">
      <Navbar />
      <div className="text-center p-10">
        <h2 className="font-bold text-3xl mt-5 mb-5">Rencontrez nos médecins</h2>
        <div className="flex">
          <div className="mr-10 mt-20">
            <SpecialiteButtonGroup
              specialities={specialities}
              selectedSpeciality={selectedSpeciality}
              setSelectedSpeciality={setSelectedSpeciality}
            />
            <RadioButtonsGroup
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
            />
          </div>
          <DoctorGrid doctors={doctors} />
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalDoctors={totalDoctors}
          doctorsPerPage={doctorsPerPage}
        />
      </div>
    </div>
  );
};

export default App;
