// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51PG0j4G5q0XFgCe1zfmxlMhD27yQOQWjD9w7EdjhETT2RAHKLdsRye90PD1GimP7PZSvFZ2AVIxYM5ERoPEwJ8VX00OsimyBLc'); // Replace with your publishable key

// const PaymentForm = () => {
//   const [stripe, setStripe] = useState(null);
//   const [elements, setElements] = useState(null);
//   const [clientSecret, setClientSecret] = useState(''); // Replace with your client secret

//   useEffect(() => {
//     const getClientSecret = async () => {
//       // Replace with your logic to fetch the client secret from your server
//       const response = await fetch('/your-endpoint-to-fetch-client-secret');
//       const data = await response.json();
//       setClientSecret(data.clientSecret);
//     };

//     getClientSecret();

//     stripePromise.then((stripeInstance) => {
//       setStripe(stripeInstance);
//     });
//   }, []);

//   useEffect(() => {
//     if (!stripe || !clientSecret) return;

//     const elements = stripe.elements({ clientSecret });
//     setElements(elements);

//     const paymentElement = elements.create('payment', {
//       layout: 'tabs',
//       defaultCollapsed: false, // Adjust options as needed
//     });
//     paymentElement.mount('#payment-element');
//   }, [stripe, clientSecret]);

//   return (
//     <div>
//       {stripe && elements ? (
//         <form onSubmit={(event) => event.preventDefault()}>
//           <div id="payment-element"></div>
//           {/* Add your form submission logic here */}
//           <button type="submit" disabled={!stripe}>
//             Pay Now
//           </button>
//         </form>
//       ) : (
//         <p>Loading payment form...</p>
//       )}
//     </div>
//   );
// };

// export default PaymentForm;
