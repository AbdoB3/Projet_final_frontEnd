import { VideoCameraOutlined, PhoneOutlined, CodeOutlined } from '@ant-design/icons';

const Services = () => (
  <div className="flex flex-col items-center  " id='services'>
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 p-5">Our Services</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6 p-4 md:p-8 ">
      {/* Step 1 */}
      <div className="p-4 sm:p-6 rounded-3xl border  border-gray-300 bg-indigo-100 shadow-md flex flex-col justify-between h-full">
        <div className="flex justify-center mb-2 ">
          <div className="flex items-center justify-center w-16 h-16 rounded-full  bg-gray-300">
            <VideoCameraOutlined className="text-4xl text-indigo-600" />
          </div>
        </div>
        <div className="text-center ">
          <h3 className="text-lg font-bold text-gray-800 font-poppins">Live video call</h3>
          <p className="text-gray-600 text-sm font-poppins">Upload diverse datasets containing various types of information for analysis.</p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="p-4 sm:p-6 rounded-3xl border border-gray-300 bg-indigo-100 shadow-md flex flex-col justify-between h-full">
        <div className="flex justify-center mb-2">
          <div className="flex items-center justify-center w-16 h-16 rounded-full  bg-gray-300">
            <PhoneOutlined className="text-4xl text-indigo-600" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 font-poppins">Consultation</h3>
          <p className="text-gray-600 text-sm font-poppins">Allow the AI model to learn patterns and insights from the provided data. This may take some time.</p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="p-4 sm:p-6 rounded-3xl border border-gray-300 bg-indigo-100 shadow-md flex flex-col justify-between h-full">
        <div className="flex justify-center mb-2">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-300">
            <CodeOutlined className="text-4xl text-indigo-600" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 font-poppins">Diagnostic AI</h3>
          <p className="text-gray-600 text-sm font-poppins">Receive comprehensive insights and analysis results based on the trained AI model.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Services;
