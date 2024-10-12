import React from 'react';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20  text-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="mb-4">
            We are a dedicated team of professionals committed to delivering top-notch services and solutions that meet the unique needs of our clients. Our focus is on innovation, creativity, and customer satisfaction.
          </p>
          <p className="mb-4">
            With years of experience in various industries, we bring a wealth of knowledge and expertise to every project. Our mission is to connect ideas with creativity and passion, ensuring that we help our clients achieve their goals effectively.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">Our Values</h3>
          <ul className="list-disc list-inside mb-4">
            <li>✔️ Integrity</li>
            <li>✔️ Innovation</li>
            <li>✔️ Excellence</li>
            <li>✔️ Teamwork</li>
            <li>✔️ Customer Satisfaction</li>
          </ul>
          <h3 className="text-2xl font-bold mt-8 mb-4">Meet Our Team</h3>
          <p>
            Our team is composed of diverse individuals with various skills and backgrounds, working together to deliver outstanding results. 
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
