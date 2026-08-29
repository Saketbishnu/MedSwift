import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At <span className="font-semibold text-blue-600">Midkift</span>, we believe that great products should be
          easy to find, simple to buy, and delivered with confidence. Our mission is to
          make everyday shopping smarter, faster, and more enjoyable for everyone.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Who We Are</h3>
          <p className="text-gray-700">
            Midkift was built to simplify the way people shop online.
            We partner with quality brands and trusted suppliers to bring you
            a curated selection of products across a wide range of categories —
            all in one convenient place.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">What We Offer</h3>
          <ul className="text-gray-700 space-y-2">
            <li>✅ A Wide Range of Quality Products</li>
            <li>✅ Best Sellers &amp; Customer Favorites</li>
            <li>✅ Competitive &amp; Transparent Pricing</li>
            <li>✅ Secure &amp; Hassle-Free Shopping</li>
          </ul>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Commitment to You</h3>
        <p className="text-gray-700">
          At Midkift, your satisfaction is our priority. We continuously work to improve
          your shopping experience — from easy product discovery to reliable order fulfilment —
          so you can shop with confidence every time.
        </p>
      </div>

      <div className="text-center mt-10">
        <p className="text-lg text-gray-600">📩 Have questions? We're here to help!</p>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default About;
