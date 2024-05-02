import React from 'react';

const DoctorCard = ({ name, specialization, imageSrc }) => (
  <div className="flex-shrink-0 m-6 relative overflow-hidden bg-gray-300 rounded-3xl max-w-xs shadow-lg group mx-2 my-4">
    <svg className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform" viewBox="0 0 375 283" fill="none" style={{ opacity: '0.1' }}>
      <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
      <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
    </svg>
    <div className="relative pt-6 px-6 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: 'transparent' }}>
      <img className="relative w-50 border" src={imageSrc} alt={name} />
    </div>
    <div className="relative text-white px-6 pb-6 mt-5">
      <span className="block font-semibold text-xl">{name}</span>
      <div className="flex justify-between">
        <span className="block opacity-75 -mb-1 l">{specialization}</span>
      </div>
    </div>
  </div>
);

const MyComponent = () => {
  const doctors = [
    { name: 'Laila Danduir', specialization: 'Dentiste', imageSrc: 'src/assets/Doctor-rafiki.png' },
    { name: 'Another Doctor', specialization: 'Specialization', imageSrc: 'src/assets/Doctor-rafiki.png' },
    { name: 'Another Doctor', specialization: 'Specialization', imageSrc: 'src/assets/Doctor-rafiki.png' },
    { name: 'Another Doctor', specialization: 'Specialization', imageSrc: 'src/assets/Doctor-rafiki.png' },
    // Add more doctor objects as needed
  ];

  return (
    <div className="p-10 bg-indigo-100">
      <h2 className="text-3xl font-bold mb-6 p-4 text-center">Meet Our Specialists</h2>
      <div className="flex justify-center">
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} {...doctor} />
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
