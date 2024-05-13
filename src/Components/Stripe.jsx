import React, { useEffect, useRef, useState } from 'react';
//import { loadStripe } from '@stripe/stripe-js';

function PaymentComponent() {
  const paymentElementRef = useRef(null);
  const [stripeError, setStripeError] = useState(null);

  useEffect(() => {
    let stripe;
    let paymentElement;

    const initializeStripe = async () => {
      try {
        // Replace 'YOUR_PUBLISHABLE_KEY' with your actual publishable key from Stripe
        stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

        const appearance = { /* appearance */ };
        const options = { /* options */ };

        const elements = stripe.elements();
        paymentElement = elements.create('payment', options);
        paymentElement.mount(paymentElementRef.current);
      } catch (error) {
        setStripeError(error);
      }
    };

    initializeStripe();

    return () => {
      if (paymentElement) {
        paymentElement.destroy();
      }
      if (stripe) {
        stripe = null;
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once after mount

  return (
    <div ref={paymentElementRef}>
      {stripeError && <div>Error: {stripeError.message}</div>}
    </div>
  );
}

const App = () => {
  return (
    <div>
      <h1>Yooo</h1>
      <PaymentComponent />
    </div>
  );
};

export default App;
