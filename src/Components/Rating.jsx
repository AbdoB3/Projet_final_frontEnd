import React from 'react';

function Rating() {
  // Fonction pour générer une URL d'image utilisateur aléatoire basée sur le genre
  const getRandomUserImage = (gender) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const genderPrefix = gender === 'male' ? 'men' : 'women';
    return `https://randomuser.me/api/portraits/${genderPrefix}/${randomNumber}.jpg`;
  }

  // Données fictives de notation pour les patients
  const ratings = [
    { name: "John Doe", rating: "4.5", comment: "Excellent service ! Très satisfait de la consultation." },
    { name: "Jane Smith", rating: "5", comment: "Service excellent! Vous êtes satisfait de la consultation" },
    { name: "David Johnson", rating: "4", comment: "Bonne expérience dans l'ensemble. Utiliserai à nouveau le service." },
  ];

  // Fonction pour déterminer le genre en fonction du nom
  const getGenderFromName = (name) => {
    // Implémentez votre logique de détection de genre ici
    // Pour simplifier, on suppose que tous les noms sont masculins
    return 'male';
  }

  return (
    <section id="testimonials" aria-label="Ce que disent nos clients" className="bg-slate-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 p-5">Avis des patients</h2>
        </div>
        <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {/* Éléments de témoignage */}
          {ratings.map((rating, index) => (
            <li key={index} >
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                <li>
                  <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                    <svg aria-hidden="true" width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
                      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.
                      054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 
                      59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.5
                      94 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 
                      6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path>
                    </svg>

                    <blockquote className="relative">
                      <p className="text-lg tracking-tight text-slate-900">{rating.comment}</p>
                    </blockquote>
                    <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                      <div>
                        <div className="font-display text-base text-slate-900">{rating.name}</div>
                        <div className="flex items-center mt-1">
                          <svg className="h-5 w-5 fill-current text-yellow-500" viewBox="0 0 24 24">
                            <path d="M12 1l2.59 7.56H22l-6.38 4.91 2.57 7.53L12 17.6l-6.19 4.4 2.57-7.53L2 8.56h7.41L12 1z"></path>
                          </svg>
                          <span className="ml-1 font-semibold">{rating.rating}</span>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-full bg-slate-50">
                        <img alt="" className="h-14 w-14 object-cover" 
                        src={getRandomUserImage(getGenderFromName(rating.name))} />
                      </div>
                    </figcaption>
                  </figure>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Rating;
