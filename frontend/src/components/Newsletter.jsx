import React from 'react';

export default function Newsletter() {
  return (
    <section
      id="newsletter"
      className="flex justify-between items-center flex-wrap bg-[#041e42] bg-no-repeat bg-[20%_30%] p-12"
      style={{ backgroundImage: 'url("src/img/banner/b14.png")', backgroundPosition: '20% 30%' }}
    >
      {/* Newsletter Text */}
      <div className="newtext text-white">
        <h4 className="text-2xl font-bold">Sign Up For Newsletters</h4>
        <p className="text-sm font-semibold text-[#818ea0]">
          Get E-mail updates about our latest shop and <span className="text-[#ffbd27]">special offers.</span>
        </p>
      </div>

      {/* Newsletter Form */}
      <div className="form flex w-2/5">
        <input
          type="text"
          placeholder="Your email address"
          className="h-12 px-5 text-sm w-full border bg-white border-transparent rounded-l-md outline-none"
        />
        <button className="normal bg-[#088178] text-white px-6 rounded-r-md whitespace-nowrap">
          Sign Up
        </button>
      </div>
    </section>
  );
}
