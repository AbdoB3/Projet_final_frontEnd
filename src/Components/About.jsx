import React from 'react';

const About = () => {
    return (
        <div className="mx-auto bg-white" id='about'>
           
            <div className="sm:flex items-center justify-center">
                <div className="sm:w-1/2 p-10 pr-10">
                    <div className="text">
                        <h2 className="my-4 font-bold text-3xl sm:text-4xl text-indigo-600">Pourquoi nous <span className="text-gray-900">ConsultaMed ?</span></h2>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Confort :</h3>
                            <p className="text-gray-700 leading-7">
                                ConsultaMed offre la commodité d'accéder à des conseils médicaux et des consultations depuis le confort de votre foyer. Cela peut vous faire gagner du temps et des efforts par rapport aux visites traditionnelles en personne dans les établissements de santé.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Accessibilité :</h3>
                            <p className="text-gray-700 leading-7">
                                Avec ConsultaMed, les services de santé deviennent plus accessibles aux personnes ayant des problèmes de mobilité, vivant dans des zones éloignées ou ayant des horaires chargés qui rendent difficile la visite d'un médecin en personne.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Assistance immédiate :</h3>
                            <p className="text-gray-700 leading-7">
                                ConsultaMed offre une plateforme d'accès rapide et immédiat à des professionnels de santé. Cela peut être particulièrement bénéfique pour les personnes recherchant des conseils médicaux ou une assistance urgente.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sm:w-1/2 p-10 flex justify-end items-center">
                    <div className="rounded-full overflow-hidden shadow-lg">
                        <img src="/src/assets/doctors.png" alt="Image de l'entreprise" className="w-full h-auto" />
                    </div>
                </div>
            </div>

            <div className="sm:flex items-center justify-center bg-[#F2F4FF]">
                <div className="sm:w-1/2 p-10 flex justify-end items-center">
                    <div className="rounded-full overflow-hidden shadow-lg">
                        <img src="/src/assets/doctor.png" alt="Image de l'entreprise" />
                    </div>
                </div>

                <div className="sm:w-1/2 p-10 pr-10">
                    <div className="text">
                        <h2 className="my-6 font-bold gap- text-3xl sm:text-4xl text-indigo-600">Pourquoi choisir <span className="text-gray-900">ConsultaMed ?</span></h2>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Préoccupations médicales non urgentes :</h3>
                            <p className="text-gray-700 leading-7">
                                ConsultaMed est idéal pour traiter les préoccupations médicales non urgentes telles que les demandes de santé générale, les renouvellements d'ordonnance et les rendez-vous de suivi.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Régions éloignées ou rurales :</h3>
                            <p className="text-gray-700 leading-7">
                                Les habitants des régions éloignées ou rurales, où l'accès aux établissements de santé peut être limité, peuvent grandement bénéficier des consultations et des services virtuels de ConsultaMed.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Modes de vie chargés :</h3>
                            <p className="text-gray-700 leading-7">
                                Les personnes aux horaires chargés peuvent trouver difficile de planifier des visites chez le médecin en personne. ConsultaMed offre flexibilité et commodité en permettant aux rendez-vous d'être effectués à distance, ce qui permet de gagner du temps et des tracas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
