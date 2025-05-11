import React from 'react';
import Features from '../components/Features';
import Newsletter from '../components/Newsletter';

const About = () => {
  return (
    <>
      {/* Parallax Section */}
      <div
        className="h-[650px] bg-fixed bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('src/img/apparel.png')" }}
      ></div>

      {/* Content Section */}
      <div className="py-12 px-6 bg-gray-100 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Who We Are?</h1>
        <p className="text-base md:text-lg text-gray-600 font-semibold">
          brings you premium, trend-forward apparel for every occasion, empowering you to express your unique
          style with confidence. Enjoy high-quality, accessible fashion and a seamless shopping experience backed
          by 24/7 support.
          <br />
          <br />
          -CARA
        </p>
      </div>

      {/* About App Section */}
      <section className="py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span className="text-black">Download Our </span>
          <a href="#" className="text-blue-600 underline hover:text-blue-800">App</a>
        </h1>
        <div className="w-[70%] mx-auto mt-8 rounded-2xl overflow-hidden">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full rounded-2xl shadow-lg"
            src="src/img/about/1.mp4"
          />
        </div>
      </section>
      <Features />
      <Newsletter />
    </>
  );
};

export default About;
