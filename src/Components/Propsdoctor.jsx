import React from 'react';
import { Link } from 'react-router-dom';

export default function Propsdoctor({ id, firstname, lastname, speciality, description,
  sexe, feePer, onClick }) {
  console.log('Doctor ID:', id);
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden bg-cover bg-no-repeat">
        <Link to={`/doctor/${id}`}>
          <img
            className="rounded-lg sm:m-h-64 md:h-64 w-full"
            src="https://source.unsplash.com/random"
            alt="Doctor"
            style={{ width: '400px', height: '400px' }}
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </Link>
      </div>
      <div className="p-2">
        <div className="flex justify-between">
          <Link to={`/doctor/${id}`}>
            <h5 className="mb-2 text-lg font-bold leading-tight text-neutral-800 dark:text-neutral-50">
              {firstname} {lastname}
            </h5>
          </Link>
          <h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50 flex">
            5.0
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1" style={{ color: 'yellow' }}>
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>
          </h5>
        </div>
        <p className="mb-1 text-sm dark:text-neutral-200 text-blue-600/100">{speciality}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Prenez rendez-vous
        </button>
      </div>
    </div>
  );
}
