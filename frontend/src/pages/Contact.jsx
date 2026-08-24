import React from "react";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Get in Touch</h2>
        <p className="text-lg text-gray-600">
          Have questions or need assistance? Feel free to reach out to us. We're always here to help!
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Contact Us</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Social Media Links */}
      <div className="mt-10 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/shreymadd" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black text-3xl transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/hiteshhh__13?igsh=YzduaWEwdGl3Z3h5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-600 text-3xl transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/your-facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 text-3xl transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/in/saket-bishnu-00769a269/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 text-3xl transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
