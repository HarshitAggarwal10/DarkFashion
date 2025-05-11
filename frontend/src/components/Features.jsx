import React from 'react';
import F1 from '../img/features/f1.png';
import F2 from '../img/features/f2.png';
import F3 from '../img/features/f3.png';
import F4 from '../img/features/f4.png';
import F5 from '../img/features/f5.png';
import F6 from '../img/features/f6.png';

const features = [
  { img: F1, text: "Free Shipping", bg: "bg-[#fddde4]" },
  { img: F2, text: "Online Order", bg: "bg-[#cdebbc]" },
  { img: F3, text: "Save Money", bg: "bg-[#d1e8f2]" },
  { img: F4, text: "Promotion", bg: "bg-[#cdd4f8]" },
  { img: F5, text: "Happy Sell", bg: "bg-[#f6dbf6]" },
  { img: F6, text: "24/7 Support", bg: "bg-[#fff2e5]" },
];

const Features = () => {
  return (
    <section
      id="feature"
      className="flex items-center justify-between flex-wrap px-10 py-6"
    >
      {features.map((item, index) => (
        <div
          key={index}
          className="w-[180px] text-center p-6 m-4 border border-[#cce7d0] rounded shadow-[20px_20px_34px_rgba(0,0,0,0.03)] hover:shadow-[10px_10px_54px_rgba(70,62,221,0.1)] transition-shadow duration-300"
        >
          <img src={item.img} alt={item.text} className="w-full mb-3" />
          <h6
            className={`inline-block px-2 py-[6px] leading-none rounded text-[#088178] text-sm font-semibold ${item.bg}`}
          >
            {item.text}
          </h6>
        </div>
      ))}
    </section>
  );
};

export default Features;
