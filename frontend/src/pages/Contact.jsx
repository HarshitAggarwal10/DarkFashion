import React from 'react';
import Newsletter from '../components/Newsletter';

const Contact = () => {
  return (
    <>
      {/* Page Header */}
      <section
        className="h-[40vh] w-full flex flex-col justify-center items-center bg-cover bg-center px-4 text-center"
        style={{ backgroundImage: "url('src/img/banner/b1.jpg')" }}
      >
        <h2 className="text-white text-5xl font-bold">#Let's Talk</h2>
        <p className="text-white text-lg">LEAVE a MESSAGE, We love to hear from you!</p>
      </section>

      {/* Contact Details */}
      <section className="flex flex-col lg:flex-row justify-between items-center px-6 py-12 gap-12">
        <div className="w-full lg:w-2/5">
          <span className="text-xs font-semibold text-gray-600">GET IN TOUCH</span>
          <h2 className="text-2xl font-bold text-gray-800 py-4">
            Visit one of our agency locations or contact us today
          </h2>
          <h3 className="text-lg font-semibold pb-4">Head Office</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <i className="fa-solid fa-map text-base pt-1" />
              <p className="text-sm">56 Glassford Street Glasgow G1 1UL New York</p>
            </li>
            <li className="flex items-start gap-4">
              <i className="fa-solid fa-envelope text-base pt-1" />
              <p className="text-sm">contactcara@cara.com</p>
            </li>
            <li className="flex items-start gap-4">
              <i className="fa-solid fa-phone-alt text-base pt-1" />
              <p className="text-sm">91+ 99999 99999</p>
            </li>
            <li className="flex items-start gap-4">
              <i className="fa-solid fa-clock text-base pt-1" />
              <p className="text-sm">Monday to Saturday: 09:00 to 16:00</p>
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-[55%] h-[400px]">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5441527278886!2d-74.0088256!3d40.7060361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a165bedccab%3A0x2cb2ddf003b5ae01!2sWall%20St%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1696069989616!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Form Details */}
      <section className="flex flex-col lg:flex-row justify-between gap-8 px-6 py-20 border border-gray-200 m-6">
        <form className="w-full lg:w-[65%] flex flex-col">
          <span className="text-xs text-gray-500 font-semibold mb-2">LEAVE A MESSAGE</span>
          <h2 className="text-2xl font-bold mb-6">We love to hear from you</h2>
          <input type="text" placeholder="Your Name" className="border border-gray-200 p-3 mb-4" />
          <input type="email" placeholder="E-mail" className="border border-gray-200 p-3 mb-4" />
          <input type="text" placeholder="Subject" className="border border-gray-200 p-3 mb-4" />
          <textarea placeholder="Your Message" rows="6" className="border border-gray-200 p-3 mb-6" />
          <button type="submit" className="bg-teal-700 text-white py-3 px-6 rounded">Submit</button>
        </form>

        <div className="w-full lg:w-[30%] flex flex-col gap-6">
          {[{
            name: 'John Doe',
            email: 'johndoe@cara.com'
          }, {
            name: 'William Smith',
            email: 'williamsmith@cara.com'
          }, {
            name: 'Emma Watson',
            email: 'emmawatson@cara.com'
          }].map((person, index) => (
            <div key={index} className="flex items-start gap-4">
              <img src={`src/img/people/${index + 1}.png`} alt={person.name} className="w-[65px] h-[65px] object-cover" />
              <p className="text-sm">
                <span className="block text-base font-semibold text-black">{person.name}</span>
                Senior Marketing Manager<br />
                Phone: + 000 123 000 77 88<br />
                Email: {person.email}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Newsletter />
    </>
  );
};

export default Contact;
