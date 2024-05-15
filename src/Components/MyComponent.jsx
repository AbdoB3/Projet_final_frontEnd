import React from 'react';
import DoctorCard from './DoctorCard';

const MyComponent = ({ doctors }) => {
    return (
        <div className='flex flex-row flex-wrap justify-evenly p-10'>
            {doctors.map((doctor, index) => (
                <DoctorCard key={index} {...doctor} style={{ margin: '5px' }} />
            ))}
        </div>
    );
};

export default MyComponent;
