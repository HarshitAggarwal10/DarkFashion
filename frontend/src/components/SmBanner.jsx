import React from 'react';

export default function SmBanner() {
  return (
    <section id="sm-banner" className="flex flex-col gap-6 mt-12">
      {/* First Banner */}
      <div className="banner-box flex flex-col items-start justify-center text-center bg-cover bg-center h-[50vh] min-w-[580px] px-8 py-6 mb-5" style={{ backgroundImage: 'url(src/img/banner/b17.jpg)' }}>
        <h4 className="text-white text-lg font-light">Crazy Deals</h4>
        <h2 className="text-white text-3xl font-extrabold">Buy 1 get 1 Free</h2>
        <span className="text-white text-sm font-medium pb-4">The best classic dress is on sale at cara</span>
        <button className="white text-sm font-semibold py-3 px-5 border border-white text-white hover:bg-[#088178] hover:border-[#088178] transition">
          Learn More
        </button>
      </div>

      {/* Second Banner */}
      <div className="banner-box flex flex-col items-start justify-center text-center bg-cover bg-center h-[50vh] min-w-[580px] px-8 py-6 mb-5" style={{ backgroundImage: 'url(src/img/banner/b10.jpg)' }}>
        <h4 className="text-white text-lg font-light">Spring / Summer</h4>
        <h2 className="text-white text-3xl font-extrabold">Upcoming Season</h2>
        <span className="text-white text-sm font-medium pb-4">The best classic dress is on sale at cara</span>
        <button className="white text-sm font-semibold py-3 px-5 border border-white text-white hover:bg-[#088178] hover:border-[#088178] transition">
          Collection
        </button>
      </div>
    </section>
  );
}
