// import {React,useState} from 'react';
// import { Button, Modal } from 'antd';
// import Navbar from './Navbar';
// import Calendrier from './Calendrier'
// import Footer from './Footer';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { setHours, setMinutes } from 'date-fns';


// const YourComponent = () => {
//     const [startDate, setStartDate] = useState(
//       setHours(setMinutes(new Date(), 30), 16)
//     );
  
//     return (
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         showTimeSelect
//         showTimeSelectOnly // This ensures only the time picker is displayed
//         timeFormat="HH" // Display hours only
//         injectTimes={[
//           setHours(setMinutes(setSeconds(new Date(), 10), 1), 0),
//           setHours(setMinutes(new Date(), 5), 12),
//           setHours(setMinutes(new Date(), 59), 23),
//         ]}
//         dateFormat="h aa" // Removed "mm" for minutes and "MMMM d, yyyy" for date
//       />
//     );
//   };
  

// const MyComponent = () => {
//     const [activeButton, setActiveButton] = useState(null);

//     // Function to handle button click and update the active button state
//     const handleButtonClick = (buttonName) => {
//         setActiveButton(buttonName);
//     };
   

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//     return (
//         <div className="bg-indigo-100 dark:bg-gray-800 py-8">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="flex items-center justify-center text-4xl font-bold text-gray-800 dark:text-white mb-7">Meet your doctor</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//                     <div className="md:flex-1 ">
//                         <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
//                             <img className="w-full h-full object-cover" src="src/assets/Doctor-rafiki.png" alt="Product Image" />
//                         </div>
//                         <div className="flex items-center justify-center -mx-2 mb-4">
//                             <div className="w-1/2 px-2">
//                                 <button type="primary" onClick={showModal} className="w-full bg-indigo-500 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-700 dark:hover:bg-gray-700">Consulter</button>
//                                 <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//                               <Calendrier/>
//                                  </Modal>               
//                             </div>
//                         </div>
//                     </div>
//                     <div className="md:flex-1 mt-5">
//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Youssef Zahir</h2>
//                         <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
//                             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt.
//                         </p>
//                         <div className="flex mb-2">
//                             <div className="mr-4">
//                                 <span className="font-bold text-gray-700 dark:text-gray-300">Sexe:</span>
//                                 <span className="text-gray-600 dark:text-gray-300 ml-1">test</span>
//                             </div>
//                         </div>
//                         <div className="flex mb-2">
//                             <div className="mr-4">
//                                 <span className="font-bold text-gray-700 dark:text-gray-300">Speciality:</span>
//                                 <span className="text-gray-600 dark:text-gray-300 ml-1">Dentiste</span>
//                             </div>
//                         </div>
//                         <div className="flex mb-2">
//                             <div className="mr-4">
//                                 <span className="font-bold text-gray-700 dark:text-gray-300">Experience:</span>
//                                 <span className="text-gray-600 dark:text-gray-300 ml-1">3 ans</span>
//                             </div>
//                         </div>
//                         <div className="flex mb-2">
//                             <div className="mr-4">
//                                 <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
//                                 <span className="text-gray-600 dark:text-gray-300 ml-1">$29.99</span>
//                             </div>
//                         </div>
//                         <div className="flex flex-col mb-2">
//                             <span className="font-bold text-gray-700 dark:text-gray-300 mb-2">Choose your type:</span>
//                             <div className="flex -mx-2">
//             <div className="w-1/2 px-2">
//                 <button
//                       className={`w-full py-2 px-4 rounded-full font-bold  ${activeButton === 'video' ? 'bg-gray-900 dark:bg-gray-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800'}`}
//                     onClick={() => handleButtonClick('video')}
//                 >
//                     Video call
//                 </button>
//             </div>
//             <div className="w-1/2 px-2">
//                 <button
//                     className={`w-full py-2 px-4 rounded-full font-bold  ${activeButton === 'cabinet' ? 'bg-gray-900 dark:bg-gray-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800'}`}
//                     onClick={() => handleButtonClick('cabinet')}
//                 >
//                     Cabinet
//                 </button>
//             </div>
//         </div>
//                         </div>
//                     </div>
//                     <div className="md:flex-1 ml-10 mt-10">
//                         <h2 className="text-xl font-bold text-gray-800 dark:text-white ">Phone number</h2>
//                         <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">+23456789</p>
//                         <div className="mb-4">
//                             <span className="font-bold text-gray-700 dark:text-gray-300">Email:</span>
//                             <p className="text-gray-600 dark:text-gray-300 text-sm">aizen@example.com</p>
//                         </div>
//                         <div className="mb-4">
//                             <span className="font-bold text-gray-700 dark:text-gray-300">Address cabinet:</span>
//                             <p className="text-gray-600 dark:text-gray-300 text-sm">
//                                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, id.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const App = () => {
//     return (
//         <div>
//             <Navbar />
       
//             <MyComponent />
//             <YourComponent/>
//             <Footer />
//         </div>
//     );
// };

// export default App;
