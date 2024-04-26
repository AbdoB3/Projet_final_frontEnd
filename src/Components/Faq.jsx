import { useEffect } from 'react';

const faqData = [
  {
    question: " What should I do if I experience technical difficulties during my online consultation?",
    answer: " If you encounter any technical issues during your consultation, please reach out to our technical support team immediately. They will assist you in resolving the problem and ensuring a smooth consultation experience.",
  },
  {
    question: "Can I upload medical reports or documents before my consultation?",
    answer: " Yes, you can upload any relevant medical reports or documents through your account on our website prior to your consultation. This will help the doctor better understand your medical history and provide more personalized care.",
  },
  {
    question: "Is my consultation with the doctor confidential?",
    answer: "Yes, your consultation with the doctor is completely confidential. We adhere to strict privacy and confidentiality guidelines to ensure that your personal health information remains secure at all times.",
  },
  {
    question: "How can I pay for my consultation?",
    answer: "You can pay for your consultation using various payment methods available on our website, including credit/debit cards, digital wallets, and online banking. Our payment system is secure and encrypted to protect your financial information.",
  },
  {
    question: "What should I do if I need urgent medical assistance outside of consultation hours?",
    answer: " If you require urgent medical assistance outside of consultation hours, please contact emergency services or visit the nearest hospital immediately. For non-emergency concerns, you can leave a message for your doctor through your account, and they will respond as soon as possible during regular hours.",
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
    <div className="bg-[#F2F4FF] h-screen">
      <section className="max-w-5xl mx-auto py-10 sm:py-20">
        <div className="flex items-center justify-center flex-col gap-y-2 py-5">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Most questions by our beloved patients</h2>
          <p className="text-lg font-medium text-slate-700/70">Frequently asked questions</p>
        </div>
        <div className="w-full px-7 md:px-10 xl:px-2 py-4">
          <div className="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-[#0A071B]/10">
                <button className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5" data-toggle={`answer-${index + 1}`} onClick={handleToggle}>
                  <span>{faq.question}</span>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className=" mt-1.5 md:mt-0 flex-shrink-0 rotate-180 transform h-5 w-5 text-[#5B5675]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
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
