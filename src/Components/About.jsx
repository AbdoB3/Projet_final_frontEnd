import React from 'react';

const About = () => {
    return (
        <div className="mx-auto bg-white" id='about'>
           
            <div className="sm:flex items-center justify-center">
                <div className="sm:w-1/2 p-10 pr-10">
                    <div className="text">
                        <h2 className="my-4 font-bold text-3xl sm:text-4xl text-indigo-600">Why us <span className="text-gray-900">ConsultaMed ?</span></h2>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Convenience:</h3>
                            <p className="text-gray-700 leading-7">
                                ConsultaMed offers the convenience of accessing medical advice and consultations from the comfort of your own home. This can save you time and effort compared to traditional in-person visits to healthcare facilities.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Accessibility:</h3>
                            <p className="text-gray-700 leading-7">
                                With ConsultaMed, healthcare services become more accessible to individuals who may have mobility issues, live in remote areas, or have busy schedules that make it difficult to visit a doctor in person.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Immediate Assistance:</h3>
                            <p className="text-gray-700 leading-7">
                                ConsultaMed provides a platform for quick and immediate access to medical professionals. This can be particularly beneficial for individuals seeking urgent medical advice or assistance.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sm:w-1/2 p-10 flex justify-end items-center">
                    <div className="rounded-full overflow-hidden shadow-lg">
                        <img src="/src/assets/doctors.png" alt="Company Image" className="w-full h-auto" />
                    </div>
                </div>
            </div>

            <div className="sm:flex items-center justify-center bg-[#F2F4FF]">
                <div className="sm:w-1/2 p-10 flex justify-end items-center">
                    <div className="rounded-full overflow-hidden shadow-lg">
                        <img src="/src/assets/doctor.png" alt="Company Image" />
                    </div>
                </div>

                <div className="sm:w-1/2 p-10 pr-10">
                    <div className="text">
                        <h2 className="my-6 font-bold gap- text-3xl sm:text-4xl text-indigo-600">Why choose <span className="text-gray-900">ConsultaMed ?</span></h2>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Non-Emergency Medical Concerns:</h3>
                            <p className="text-gray-700 leading-7">
                                ConsultaMed is ideal for addressing non-emergency medical concerns such as general health inquiries, prescription refills, and follow-up appointments.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Remote or Rural Areas:</h3>
                            <p className="text-gray-700 leading-7">
                                Residents of remote or rural areas, where access to healthcare facilities may be limited, can benefit greatly from ConsultaMed virtual consultations and services.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Busy Lifestyles:</h3>
                            <p className="text-gray-700 leading-7">
                                Individuals with busy schedules may find it challenging to schedule traditional in-person doctor visits. ConsultaMed offers flexibility and convenience by allowing appointments to be conducted remotely, saving time and hassle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
