import React from 'react';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { FaArrowRightLong } from 'react-icons/fa6';

const blogPosts = [
    {
        id: 1,
        img: 'src/img/blog/b1.jpg',
        title: 'The Cotton-Jersey Zip-Up Hoodie',
        date: '13/01',
        desc: 'Kickstarter man braid godard coloring book. Raclette waistcoat selfies',
    },
    {
        id: 2,
        img: 'src/img/blog/b2.jpg',
        title: 'How to Style a Quiff',
        date: '13/04',
        desc: 'Kickstarter man braid godard coloring book. Raclette waistcoat selfies',
    },
    {
        id: 3,
        img: 'src/img/blog/b3.jpg',
        title: 'Must-Have Skater Girl Items',
        date: '12/01',
        desc: 'Kickstarter man braid godard coloring book. Raclette waistcoat selfies',
    },
    {
        id: 4,
        img: 'src/img/blog/b4.jpg',
        title: 'Runway-Inspired Trends',
        date: '16/01',
        desc: 'Kickstarter man braid godard coloring book. Raclette waistcoat selfies',
    },
    {
        id: 5,
        img: 'src/img/blog/b6.jpg',
        title: 'AW20 Menswear Trends',
        date: '10/03',
        desc: 'Kickstarter man braid godard coloring book. Raclette waistcoat selfies',
    },
];

const Blog = () => {
    return (
        <>
            {/* Header Section */}
            <section
                className="flex flex-col items-center justify-center text-center h-[40vh] w-full bg-cover bg-center px-4"
                style={{ backgroundImage: "url('src/img/banner/b1.jpg')" }}
            >
                <h2 className="text-white text-5xl font-bold">#readmore</h2>
                <p className="text-white text-lg">Read all case studies about our products!</p>
            </section>

            {/* Blog Section */}
            <section className="px-[150px] pt-[150px] pb-0 max-md:px-4">
                {blogPosts.map((post) => (
                    <div key={post.id} className="relative flex items-center w-full pb-[90px] flex-col md:flex-row">
                        <div className="w-full md:w-1/2 mb-6 md:mb-0 md:mr-10">
                            <img
                                src={post.img}
                                alt={post.title}
                                className="w-full h-[300px] object-cover mt-8"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
                            <p className="text-gray-600 mb-4">{post.desc}</p>
                            <a
                                href="#"
                                className="relative text-sm font-bold text-black hover:text-[#088178] transition-colors duration-300"
                            >
                                CONTINUE READING
                                <span className="absolute top-1 left-full ml-2 w-[50px] h-[1px] bg-black hover:bg-[#088178] transition-all duration-300" />
                            </a>
                        </div>
                        <h1 className="absolute -top-10 left-0 text-[70px] font-bold text-[#c9cbce] z-[-1]">{post.date}</h1>
                    </div>
                ))}
            </section>
            <section className="text-center py-8 mt-6">
                <a
                    href="#"
                    className="bg-[#088178] text-white font-semibold px-5 py-3 rounded mx-1 inline-block"
                >
                    1
                </a>
                <a
                    href="#"
                    className="bg-[#088178] text-white font-semibold px-5 py-3 rounded mx-1 inline-block"
                >
                    2
                </a>
                <a
                    href="#"
                    className="bg-[#088178] text-white font-semibold px-5 py-3 rounded mx-1 inline-flex items-center justify-center"
                >
                    <FaArrowRightLong className="text-[16px]" />
                </a>
            </section>
            <Newsletter />
        </>
    );
};

export default Blog;
