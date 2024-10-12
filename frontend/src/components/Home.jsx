import React from 'react';
import { Link } from 'react-router-dom';
import welcomeImage from '../../public/IFp0NKV6GU8HeQv3EKx-Y-transformed.png'
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="text-white py-20 flex flex-col justify-center md:flex-row items-center ">
        <div className=" flex flex-col  md:pr-8 text-center items-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to My Website</h2>
          <p className="text-lg mb-8">Connecting ideas with creativity and passion.</p>
          <Link to="#services" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
            Get Started
          </Link>
        </div>
        <div className="flex justify-end ">
          <img src={welcomeImage} alt="Welcome" className="md:w-96  w-full h-auto rounded shadow-lg" />
        </div>
      </section>

      {/* Content Sections */}
      <section id="about" className="py-16 text-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="mb-4">
            We are a team of passionate individuals committed to delivering the best service possible. Our expertise spans across various fields, ensuring that we meet the unique needs of our clients.
          </p>
        </div>
      </section>

      <section id="services" className="py-16 text-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <ul className="space-y-4">
            <li>✔️ Web Development</li>
            <li>✔️ Graphic Design</li>
            <li>✔️ Digital Marketing</li>
            <li>✔️ Content Creation</li>
          </ul>
        </div>
      </section>

      <section id="contact" className="py-16 text-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p>If you have any questions or would like to reach out, please <Link to="/contact" className="text-blue-600">contact us</Link>.</p>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Home;
