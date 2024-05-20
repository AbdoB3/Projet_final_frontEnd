import React from 'react';
import { Link } from 'react-router-dom';


const DoctorCard = ({ id, firstname, lastname, speciality, sexe, feePer }) => (
  <div className="relative w-full max-w-2xl my-8 md:my-16 p-7 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 dark:border-gray-400 shadow-lg rounded-2xl" style={{ width: "400px", backgroundColor: 'white' }}>
    <div className="flex justify-center sm:justify-start sm:w-auto">
      <img className="ml-3 object-cover w-30 mt-3 mr-3 rounded-full" src="https://lh3.googleusercontent.com/a/AEdFTp70cvwI5eevfcr4LonOEX5gB2rzx7JnudOcnYbS1qU=s96-c" alt={`${firstname} ${lastname}`} />
    </div>
    <div className="sm:w-auto flex flex-col items-center sm:items-start">
    <Link to={`/doctor/${id}`}>
        <p className="mb-2 text-indigo-600 dark:text-gray-200 text-xl" itemProp="author">
          {firstname} {lastname}
        </p>
      </Link>
      <div className="mb-4 md:text-lg text-gray-400">
        <p className='text-black text-lg'>Speciality: {speciality}</p>
        <p className='text-black text-lg'>Sexe: {sexe}</p>
        <p className='text-black text-lg'>Consultation: {feePer} $</p>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Prenez rendez-vous
        </button>
      </div>
    </div>
  </div>
);

export default DoctorCard;
