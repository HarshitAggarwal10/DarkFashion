// components/Banner.jsx
import React from 'react';

export default function Banner() {
  return (
    <section
      id="banner"
      className="flex flex-col justify-center items-center text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('src/img/banner/b2.jpg')",
        height: '40vh',
      }}
    >
      <h4 className="text-white text-sm">Repair Services</h4>
      <h2 className="text-white text-3xl py-2">
        Up to <span className="text-red-500">70% Off</span> All T-shirts & Accessories
      </h2>
      <button className="normal text-white bg-transparent border-2 border-white px-6 py-2 rounded-lg transition duration-300 hover:bg-[#088178] hover:text-white">
        Explore More
      </button>
    </section>
  );
}
