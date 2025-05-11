import React from 'react';

export default function Banner3() {
  return (
    <section id="banner3" className="flex justify-between flex-wrap px-20 py-12 gap-6">
      {/* Banner 1 */}
      <div className="banner-box flex flex-col items-start justify-center text-center bg-cover bg-center h-[30vh] min-w-[30%] px-6 py-4 mb-5" style={{ backgroundImage: 'url(src/img/banner/b7.jpg)' }}>
        <h2 className="text-white text-2xl font-extrabold">JEWELLERY SALE</h2>
        <h3 className="text-red-500 text-lg font-bold">50% OFF On Making Charges</h3>
      </div>

      {/* Banner 2 */}
      <div className="banner-box flex flex-col items-start justify-center text-center bg-cover bg-center h-[30vh] min-w-[30%] px-6 py-4 mb-5" style={{ backgroundImage: 'url(src/img/banner/b4.jpg)' }}>
        <h2 className="text-white text-2xl font-extrabold">NEW JACKET COLLECTION</h2>
        <h3 className="text-red-500 text-lg font-bold">Winter 2023</h3>
      </div>

      {/* Banner 3 */}
      <div className="banner-box flex flex-col items-start justify-center text-center bg-cover bg-center h-[30vh] min-w-[30%] px-6 py-4 mb-5" style={{ backgroundImage: 'url(src/img/banner/b18.jpg)' }}>
        <h2 className="text-white text-2xl font-extrabold">T-SHIRTS</h2>
        <h3 className="text-red-500 text-lg font-bold">New Trendy Prints</h3>
      </div>
    </section>
  );
}
