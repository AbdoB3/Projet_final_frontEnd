import React from 'react';
import heroImage from '..//assets/doctors.jpg';

const Hero = () => {
    return (
        <div className=" text-white text-center grid bg-cover  bg-no-repeat  "
            style={{ backgroundImage: `url(${heroImage})`, height: '100vh' }}>

            <div className="col-start-1 row-start-1 bg-gray-800 bg-opacity-70 w-full h-full"></div>
            <div className="col-start-1 row-start-1 mx-auto my-auto  flex-col flex items-center justify-center flex">
                <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                    Trouvez Votre Consultation  Rapidement </h1>
                <button className="flex items-center justify-center 
                                    px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600" >

                    Trouver  un Doctor
                    <svg className="w-5 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </button>
                <div className="mt-8 flex justify-center item-end" >

                    <form class="max-w-md mx-auto" >
                        <div class="relative w-full">
                            <input type="search" id="location-search"
                                class=" w-100 block p-2.5 
                                w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 
                                            border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                        dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 
                                        dark:text-white "
                                placeholder="Search for Specialte ..." required style={{ width: '300px', borderRadius: '10px' }} />
                            <button type="submit" class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>


                        </div>
                    </form>


                </div>

            </div>
        </div>
    );
}

export default Hero;
