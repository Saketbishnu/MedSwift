import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At <span className="font-semibold text-blue-600">Midkift</span>, we believe that quality healthcare should be 
          accessible, affordable, and convenient for everyone. Our mission is to 
          provide trusted pharmaceutical products, ensuring that you and your 
          loved ones receive the best care possible.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Who We Are</h3>
          <p className="text-gray-700">
            Midkift was founded to revolutionize the way people access medicines. 
            We collaborate with reputed pharmaceutical brands and certified suppliers 
            to ensure that every product meets the highest quality and safety standards.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">What We Offer</h3>
          <ul className="text-gray-700 space-y-2">
            <li>✅ Latest & Trusted Medicines</li>
            <li>✅ Best Sellers & Customer Favorites</li>
            <li>✅ Affordable Pricing</li>
            <li>✅ Secure & Hassle-Free Shopping</li>
          </ul>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Commitment to You</h3>
        <p className="text-gray-700">
          At Midkift, your well-being is our priority. We continuously strive to improve 
          our services, provide expert healthcare solutions, and deliver high-quality 
          products at the best prices.
        </p>
      </div>

      <div className="text-center mt-10">
        <p className="text-lg text-gray-600">📩 Have questions? We’re here to help!</p>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default About;
