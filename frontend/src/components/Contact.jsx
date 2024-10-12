import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useData } from '../store/login.user'; // Adjust this import based on your file structure
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const { userData, setUserData } = useData(); // Accessing userData and setUserData from context
  const {
    register,
    handleSubmit,
    setValue,  // Function to set form values programmatically
    reset,
    formState: { errors },
  } = useForm();

  // Set initial values for the form
  useEffect(() => {
    if (userData?.name) {
      setValue('name', userData.name); // Set the name field with userData.name
    }
    if (userData?.email) {
      setValue('email', userData.email); // Set the email field with userData.email
    }
  }, [userData]); // Watch for changes in userData

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Post form data to the backend
      const response = await axios.post('http://localhost:5000/api/contact', data);
      if (response.status === 200 || response.status === 201) {
        toast.success('Message sent successfully!');
        reset({
          message: '',
        }); // Reset the form after success
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again later.';
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="mb-8">We’d love to hear from you! Please fill out the form below and we will get back to you as soon as possible.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="shadow-md rounded md:px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })} // Registering name input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email format is invalid',
                  },
                })} // Registering email input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                {...register('message', { required: 'Message is required' })}
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs italic">{errors.message.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
