import React from 'react';
import H4 from "../img/hero4.png";
import Button from "../img/button.png";

const Hero = () => {
  return (
    <section
      className="h-[90vh] w-full bg-cover bg-[top_25%_right_0] px-20 flex flex-col items-start justify-center"
      style={{ backgroundImage: `url(${H4})` }}
    >
      <h4 className="pb-4 text-xl font-bold">Trade-in-offer</h4>
      <h2 className="text-4xl font-bold">Super value deals</h2>
      <h1 className="text-5xl font-bold text-[#088178]">On all products</h1>
      <p className="mt-4 mb-6 text-lg font-semibold">
        Save more with coupons & up to 70% off!
      </p>
      <button
        className="text-[#088178] font-bold text-base py-3 pl-[65px] pr-[80px] bg-no-repeat"
        style={{ backgroundImage: `url(${Button})` }}
      >
        Shop now
      </button>
    </section>
  );
};

export default Hero;
