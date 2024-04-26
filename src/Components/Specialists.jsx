// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { BsArrowRight } from 'react-icons/bs';

// import doctorImg01 from "./doctor-img01.png";
// import doctorImg02 from "./doctor-img02.png";
// import doctorImg03 from "./doctor-img03.png";

// const doctors = [
//   {
//     id: "01",
//     name: "Dr. Alfaz Ahmed",
//     speciality: "Surgeon",
//     avgRating: 4.8,
//     totalRating: 272,
//     photo: doctorImg01,
//     totalPatients: 1500,
//     hospital: "Mount Adora Hospital, Sylhet.",
//   },
//   {
//     id: "02",
//     name: "Dr. Saleh Mahmud",
//     speciality: "Neurologist",
//     avgRating: 4.8,
//     totalRating: 272,
//     photo: doctorImg02,
//     totalPatients: 1500,
//     hospital: "Mount Adora Hospital, Sylhet.",
//   },
//   {
//     id: "03",
//     name: "Dr. Farid Uddin",
//     speciality: "Dermatologist",
//     avgRating: 4.8,
//     totalRating: 272,
//     photo: doctorImg03,
//     totalPatients: 1500,
//     hospital: "Mount Adora Hospital, Sylhet.",
//   },
// ];

// const DoctorList = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
//       {doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}
//     </div>
//   );
// };

// const DoctorCard = ({ doctor }) => {
//   const { name, speciality, avgRating, totalRating, photo, totalPatients, hospital } = doctor;

//   return (
//     <div className="p-3 lg:p-5">
//       <img src={photo} alt={name} className="w-full" />
//       <h2 className="text-18 lg:text-26 lg:leading-9 text-headingColor font-700 mt-3 lg:mt-5">{name}</h2>
//       <div className="mt-2 lg:mt-4 flex items-center justify-between">
//         <span className="bg-CCF0F3 text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-12 lg:text-16 font-semibold rounded">{speciality}</span>
//         <div className="flex items-center gap-6">
//           <span className="flex items-center gap-6 text-14 lg:text-16 font-semibold text-headingColor">{avgRating}</span>
//           <span className="text-14 lg:text-16 font-400 text-textColor">({totalRating})</span>
//         </div>
//       </div>
//       <div className="mt-5 flex items-center justify-between">
//         <div>
//           <h3 className="text-16 lg:text-18 lg:leading-30 font-semibold text-headingColor">+{totalPatients} patients</h3>
//           <p className="text-14 leading-6 font-400 text-textColor">At {hospital}</p>
//           <Link to="/doctors" className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
//             <BsArrowRight className="group-hover:text-white w-6 h-5" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// DoctorCard.propTypes = {
//   doctor: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     speciality: PropTypes.string.isRequired,
//     avgRating: PropTypes.number.isRequired,
//     totalRating: PropTypes.number.isRequired,
//     photo: PropTypes.string.isRequired,
//     totalPatients: PropTypes.number.isRequired,
//     hospital: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default DoctorList;
