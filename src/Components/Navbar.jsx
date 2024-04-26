import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Logo from '../assets/logoconsolta.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(""); // Add state to track active link
    const [isAuthorLink, setIsAuthorLink] = useState(false); // Add state to track author link

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleSetActiveLink = (link) => {
        setActiveLink(link);
        setIsAuthorLink(link === "/author"); // Update isAuthorLink state based on the link
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full sticky top-0 z-10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="logo flex items-center">
                    <FontAwesomeIcon icon={faHeartbeat} className="text-3xl mr-2 text-red-500" style={{ color: ' navy' }} beat />
                    <span className="font-bold text-2xl" style={{color :'#395886'}}>Consulta</span>
<span className="font-bold text-2xl text-cons-light" style={{color :'#5e8cc9'}}>Med</span>

                </div>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div className="hidden md:block">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300
                             dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300
                            dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Vous Etes Doctors ?
                        </button>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-cta"
                        aria-expanded={isNavOpen ? "true" : "false"}
                        onClick={toggleNav} 
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`w-full md:flex md:w-auto ${isNavOpen ? 'block' : 'hidden'}`} id="navbar-default">
                    <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 
                    md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>

                        </li>
                        <li>

                            <Link
                                to="/"
                                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent 
                                md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 
                                dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent 
                                ${activeLink === "/" ? "text-blue-700" : "text-gray-900"} 
                                ${isAuthorLink ? "text-black" : ""}`}
                                onClick={() => handleSetActiveLink("/")}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 dark:hover:bg-gray-700 
                                dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "/about" ? "text-blue-700" : "text-gray-900"}`}
                                onClick={() => handleSetActiveLink("/about")}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "/services" ? "text-blue-700" : "text-gray-900"}`}
                                onClick={() => handleSetActiveLink("/services")}
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`block py-2 px-3 rounded hover:bg-gray-100
                                 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 
                                 md:p-0 dark:text-white md:dark:text-blue-500 dark:hover:bg-gray-700
                                  dark:hover:text-white md:dark:hover:bg-transparent ${activeLink === "/contact" ? "text-blue-700" : "text-gray-900"}`}
                                onClick={() => handleSetActiveLink("/contact")}

                            >
                                Contact
                            </Link>
                        </li>











                    </ul>

                </div>
            </div>
        </nav>
    );
}