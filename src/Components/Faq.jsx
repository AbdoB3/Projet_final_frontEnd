import { useEffect } from 'react';

const faqData = [
  {
    question: "Que dois-je faire si je rencontre des difficultés techniques lors de ma consultation en ligne ?",
    answer: "Si vous rencontrez des problèmes techniques lors de votre consultation, veuillez contacter immédiatement notre équipe de support technique. Ils vous aideront à résoudre le problème et à garantir une expérience de consultation fluide.",
  },
  {
    question: "Puis-je télécharger des rapports médicaux ou des documents avant ma consultation ?",
    answer: "Oui, vous pouvez télécharger tous les rapports médicaux ou documents pertinents via votre compte sur notre site Web avant votre consultation. Cela aidera le médecin à mieux comprendre votre historique médical et à fournir des soins plus personnalisés.",
  },
  {
    question: "Ma consultation avec le médecin est-elle confidentielle ?",
    answer: "Oui, votre consultation avec le médecin est totalement confidentielle. Nous respectons des directives strictes en matière de confidentialité pour garantir que vos informations de santé personnelles restent sécurisées en tout temps.",
  },
  {
    question: "Comment puis-je payer ma consultation ?",
    answer: "Vous pouvez payer votre consultation en utilisant divers modes de paiement disponibles sur notre site Web, y compris les cartes de crédit/débit, les portefeuilles numériques et la banque en ligne. Notre système de paiement est sécurisé et crypté pour protéger vos informations financières.",
  },
  {
    question: "Que dois-je faire si j'ai besoin d'une assistance médicale urgente en dehors des heures de consultation ?",
    answer: "Si vous avez besoin d'une assistance médicale urgente en dehors des heures de consultation, veuillez contacter les services d'urgence ou vous rendre immédiatement à l'hôpital le plus proche. Pour les préoccupations non urgentes, vous pouvez laisser un message à votre médecin via votre compte, et ils vous répondront dès que possible pendant les heures normales.",
  }
];

const Faq = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll('.question-btn');

    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-toggle');
        const target = document.getElementById(targetId);
        const isExpanded = target.style.display === 'block';

        if (isExpanded) {
          target.style.display = 'none';
          this.querySelector('svg').classList.remove('rotate-180');
        } else {
          target.style.display = 'block';
          this.querySelector('svg').classList.add('rotate-180');
        }
      });
    });

    // Cleanup
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', function() {});
      });
    };
  }, []);

  const handleToggle = (event) => {
    const targetId = event.currentTarget.getAttribute('data-toggle');
    const target = document.getElementById(targetId);
    const isExpanded = target.style.display === 'block';

    if (isExpanded) {
      target.style.display = 'none';
      event.currentTarget.querySelector('svg').classList.remove('rotate-180');
    } else {
      target.style.display = 'block';
      event.currentTarget.querySelector('svg').classList.add('rotate-180');
    }
  };

  return (
    <div className="bg-[#F2F4FF]">
      <section className="max-w-5xl mx-auto py-10 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 p-5">Questions fréquemment posées</h2>
        </div>
        <div className="w-full px-7 md:px-10 xl:px-2 py-4">
          <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-[#0A071B]/10">
                <button className="
                question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5" 
                data-toggle={`answer-${index + 1}`} onClick={handleToggle}>
                  <span>{faq.question}</span>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" 
                  viewBox="0 0 24 24" className="text-2xl mt-1.5 md:mt-0 flex-shrink-0 rotate-180 transform h-5 w-5 text-[#5B5675]" 
                  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                  </svg>
                </button>
                <div className="answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium" id={`answer-${index + 1}`} style={{ display: 'none' }}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
