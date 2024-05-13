import { useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // Replace with your actual client secret from Stripe
  const clientSecret = 'your_client_secret';

  const appearance = { /* appearance */ }; // Customize appearance (optional)
  const options = {
    layout: 'tabs', // Switch between "tabs" and "modal" layouts
    defaultCollapsed: false, // Keep payment element initially expanded
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Handle errors if Stripe or Elements are not loaded
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(elements.CardElement),
      },
    });

    if (result.error) {
      // Handle payment errors
      console.error('Payment error:', result.error.message);
    } else {
      // Handle successful payment
      console.log('Payment successful:', result.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Elements stripe={stripe} elements={elements}>
        <CardElement options={options} />
      </Elements>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};



const App = () => {
  return (
    <div>
      <h1>Yooo</h1>
      <PaymentForm />
    </div>
  );
};

export default App;