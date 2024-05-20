// Hero.js
import React, { useState } from 'react';
import heroImage from '..//assets/doctors.jpg';

const Hero = ({ handleSearchSubmit, handleSearchInputChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearchSubmit(searchTerm);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        handleSearchInputChange(event);
    };

    return (
        <div className="text-white text-center grid bg-cover bg-no-repeat" style={{ backgroundImage: `url(${heroImage})`, height: '110vh', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="col-start-1 row-start-1 bg-gray-800 bg-opacity-70 w-full h-full"></div>
            <div className="col-start-1 row-start-1 mx-auto my-auto flex-col  items-center justify-center flex">
                <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                    Trouvez Votre Consultation Rapidement{' '}
                </h1>
                <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Trouver un Doctor
                    <svg
                        className="w-5 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </button>
                <div className="mt-8 flex justify-center item-end">
                    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                        <div className="relative w-full">
                            <input
                                type="search"
                                id="location-search"
                                className="w-full block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Search for Specialty ..."
                                required
                                value={searchTerm}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="absolute top-0 right-0 h-full p-2.5 text-sm text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hero;
