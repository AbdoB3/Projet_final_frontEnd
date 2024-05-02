import React from 'react';

const RadioButtonsGroup = () => {
  return (
    <div className="border rounded-md p-4 w-full mx-auto max-w-2xl">
      <h4 className="text-lg lg:text-2xl font-semibold">
        Gender
      </h4>

      <div>
        <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
          <input type="radio" id="homme" name="gender" value="homme" />
          <i className="pl-2">Homme</i>
        </label>

        <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
          <input type="radio" id="femme" name="gender" value="femme" />
          <i className="pl-2">Femme</i>
        </label>
      </div>
    </div>
  );
};

const SpecialiteButtonGroup = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-indigo-100 shadow-md rounded-md p-6">
        <h3 className="text-lg font-semibold mb-4">Specialite</h3>
        <div className="space-y-2">
          <div className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="city"
                value="buenos-aires"
                className="form-radio text-secondary-500 h-5 w-5"
              />
              <span className="ml-2">Buenos Aires</span>
            </label>
          </div>
          <div className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="city"
                value="sydney"
                className="form-radio text-secondary-500 h-5 w-5"
              />
              <span className="ml-2">Sydney</span>
            </label>
          </div>
          <div className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="city"
                value="san-francisco"
                className="form-radio text-secondary-500 h-5 w-5"
              />
              <span className="ml-2">San Francisco</span>
            </label>
          </div>
          <div className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="city"
                value="london"
                className="form-radio text-secondary-500 h-5 w-5"
              />
              <span className="ml-2">London</span>
            </label>
          </div>
          <div className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="city"
                value="tokyo"
                className="form-radio text-secondary-500 h-5 w-5"
              />
              <span className="ml-2">Tokyo</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorCard = ({ imageSrc, productName, brand }) => (
  <div className="w-72 mb-10 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
    <a href="#">
      <img src={imageSrc} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
      <div className="px-4 py-3 w-72">
        <span className="text-lg font-bold text-black truncate block capitalize">{productName}</span>
        <p className="text-gray-400 mr-3 uppercase text-xs">{brand}</p>
        <div className="flex items-start">
          <div className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  </div>
);

const DoctorGrid = () => {
  const products = [
    { imageSrc: 'src/assets/Doctor-rafiki.png', productName: 'Youssef Zahir', brand: 'Dermatology' },
    { imageSrc: 'src/assets/Doctor-rafiki.png', productName: 'abderrahman Bihi', brand: 'Dentiste' },
    { imageSrc: 'src/assets/Doctor-rafiki.png', productName: 'Laila Danguir', brand: 'Generlaiste' },
    { imageSrc: 'src/assets/Doctor-rafiki.png', productName: 'Meryam', brand: 'Interniste' },
    { imageSrc: 'src/assets/Doctor-rafiki.png', productName: 'Product 2', brand: 'Brand 2' },
    { imageSrc: 'src/assets/Doctor-rafiki.png', productName: 'Product 3', brand: 'Brand 3' },
    { imageSrc: 'src/assets/Doctor-rafiki.png', productName: 'Product 1', brand: 'Brand 1' },
    { imageSrc: 'src/assets/Doctor-rafiki.png', productName: 'Product 2', brand: 'Brand 2' },
    { imageSrc: 'src/assets/Doctor-rafiki.png', productName: 'Product 3', brand: 'Brand 3' },
    // Add more product objects as needed
  ];

  return (
    <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {products.map((product, index) => (
        <DoctorCard key={index} {...product} />
      ))}
    </section>
  );
};

const Pagination = () => {
  return (
    <div className="flex justify-center">
      <nav className="bg-gray-200 rounded-full px-4 py-2">
        <ul className="flex text-gray-600 gap-4 font-medium py-2">
          <li>
            <a href="#" className="rounded-full px-4 py-2 bg-white text-gray-600">1</a>
          </li>
          <li>
            <a href="#" className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out">2</a>
          </li>
          <li>
            <a href="#" className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out">3</a>
          </li>
          <li>
            <a href="#" className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out">4</a>
          </li>
          <li>
            <a href="#" className="rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out">5</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const App = () => {
  return (
	
    <div className="text-center p-10">
			<h2 className='font-bold text-3xl mt-10 mb-10'>Meet our Doctors</h2>
      <div className="flex">
        <div className="mr-10 mt-20">
          <SpecialiteButtonGroup />
          <RadioButtonsGroup />
        </div>
        <DoctorGrid />
      </div>
      <Pagination />
    </div>
  );
};

export default App;
