import React from 'react';

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between px-12 py-16 bg-gray-100">
      {/* First Column */}
      <div className="col flex flex-col items-start mb-12 w-full sm:w-1/4">
        <img className="logo mb-8" src="src/img/logo.png" alt="Logo" />
        <h4 className="text-sm font-semibold pb-5">Contact</h4>
        <p className="text-sm mb-2"><strong>Address: </strong> 562 Wellington Road, Street 32, San Francisco</p>
        <p className="text-sm mb-2"><strong>Phone: </strong> +01 2222 365 /(+91) 012345 6789</p>
        <p className="text-sm mb-2"><strong>Hours: </strong> 10:00 - 18:00, Mon - Sat</p>

        {/* Follow Us */}
        <div className="follow mt-5">
          <h4 className="text-sm font-semibold pb-5">Follow Us</h4>
          <div className="icon flex space-x-3">
            <i className="fab fa-facebook-f text-[#465b52] cursor-pointer hover:text-[#088178]"></i>
            <i className="fab fa-twitter text-[#465b52] cursor-pointer hover:text-[#088178]"></i>
            <i className="fab fa-instagram text-[#465b52] cursor-pointer hover:text-[#088178]"></i>
            <i className="fab fa-pinterest-p text-[#465b52] cursor-pointer hover:text-[#088178]"></i>
            <i className="fab fa-youtube text-[#465b52] cursor-pointer hover:text-[#088178]"></i>
          </div>
        </div>
      </div>

      {/* Second Column */}
      <div className="col flex flex-col items-start mb-12 w-full sm:w-1/4">
        <h4 className="text-sm font-semibold pb-5">About</h4>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">About Us</a>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">Delivery Information</a>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">Privacy Policy</a>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">Terms & Conditions</a>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">Contact Us</a>
      </div>

      {/* Third Column */}
      <div className="col flex flex-col items-start mb-12 w-full sm:w-1/4">
        <h4 className="text-sm font-semibold pb-5">My Account</h4>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">Sign In</a>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">View Cart</a>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">My Wishlist</a>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">Track My Order</a>
        <a href="#" className="text-sm text-[#222] mb-2 hover:text-[#088178]">Help</a>
      </div>

      {/* Fourth Column */}
      <div className="col install flex flex-col items-start mb-12 w-full sm:w-1/4">
        <h4 className="text-sm font-semibold pb-5">Install App</h4>
        <p className="text-sm mb-4">From App Store or Google Play</p>
        <div className="row flex mb-4">
          <img src="src/img/pay/app.jpg" alt="App Store" className="border border-[#088178] rounded-lg mr-2" />
          <img src="src/img/pay/play.jpg" alt="Google Play" className="border border-[#088178] rounded-lg" />
        </div>
        <p className="text-sm mb-2">Secure Payment Gateways</p>
        <img src="src/img/pay/pay.png" alt="Payment Methods" className="w-full" />
      </div>

      {/* Copyright */}
      <div className="copyright w-full text-center mt-8">
        <p className="text-sm text-[#222]">© 2023, cara.pvt - All the rights are with Cara.Pvt</p>
      </div>
    </footer>
  );
}
