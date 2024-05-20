import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const RadioButtonsGroup = ({ selectedGender, setSelectedGender }) => {
  return (
    <div className="border rounded-md p-4 w-full mx-auto max-w-2xl bg-gray-100 mt-5">
      <h4 className="text-lg lg:text-2xl font-semibold">Gender</h4>
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
        <h3 className="text-lg font-bold mb-4">Specialité</h3>
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
    <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor._id}
          imageSrc={doctor.imageUrl || 'src/assets/Doctor-rafiki.png'}
          Name={`${doctor.firstname} ${doctor.lastname}`}
          Speciality={doctor.speciality}
        />
      ))}
    </section>
  );
};

const DoctorCard = ({ imageSrc, Name, Speciality }) => (
  <div className="w-72 mb-1 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
    <a href="#">
      <img src={imageSrc} alt="Doctor" className="h-80 w-72 object-cover rounded-t-xl" />
      <div className="px-4 py-3 w-72">
        <span className="text-lg font-bold text-black truncate block capitalize">{Name}</span>
        <p className="text-gray-400 mr-3 uppercase text-xs">{Speciality}</p>
        <div className="flex items-start">
          <div className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
          </div>
        </div>
      </div>
    </a>
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
                className={`rounded-full px-4 py-2 ${currentPage === index + 1 ? 'bg-white' : 'hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out'}`}
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
  const [doctorsPerPage] = useState(6);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get('http://localhost:3000/doctors', {
        params: {
          gender: selectedGender,
          speciality: selectedSpeciality,
          page: currentPage,
          limit: doctorsPerPage
        }
      });
      setDoctors(res.data);
    };

    const fetchSpecialities = async () => {
      const res = await axios.get('http://localhost:3000/speciality');
      setSpecialities(res.data);
    };

    fetchDoctors();
    fetchSpecialities();
  }, [selectedGender, selectedSpeciality, currentPage]);

  return (
    <div className="bg-indigo-100">
      <Navbar />
      <div className="text-center p-10">
        <h2 className="font-bold text-3xl mt-5 mb-5">Meet our Doctors</h2>
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
          totalDoctors={doctors.length}
          doctorsPerPage={doctorsPerPage}
        />
      </div>
    </div>
  );
};

export default App;
