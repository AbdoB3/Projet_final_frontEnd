import React, { useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';

function PaymentComponent() {
  const paymentElementRef = useRef(null);

  useEffect(() => {
    let stripe;
    let paymentElement;

    const initializeStripe = async () => {
      // Replace 'pk_test_TYooMQauvdEDq54NiTphI7jx' with your actual publishable key
      stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

      // Define appearance and options objects
      const appearance = { /* appearance */ };
      const options = { /* options */ };

      // Create elements and mount payment element
      const elements = stripe.elements();
      paymentElement = elements.create('payment', options);
      paymentElement.mount(paymentElementRef.current);
    };

    initializeStripe();

    // Cleanup function
    return () => {
      if (paymentElement) {
        paymentElement.destroy();
      }
      if (stripe) {
        stripe = null;
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once after mount

  return <div ref={paymentElementRef}></div>;
}

const App = () => {
  return (
    <div>
      <h1>Yooo</h1>
      <PaymentComponent/>
    </div>
  );
};

export default App;
