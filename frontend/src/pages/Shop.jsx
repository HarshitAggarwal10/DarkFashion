import React from 'react';
import ProductSection from '../components/ProductSection';
import { FaArrowRightLong } from 'react-icons/fa6';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Shop() {
    const featuredProducts = [
        {
            _id: "prod1",
            name: "Minimalist Space Tee",
            price: 45,
            image: "src/img/products/f1.jpg",
            description: "Comfortable cotton t-shirt with space design",
            category: "T-Shirts",
            stock: 100
        },
        {
            _id: "prod2",
            name: "Urban Explorer Shirt",
            price: 52,
            image: ["src/img/products/f2.jpg"],
            description: "Durable shirt for everyday urban adventures",
            category: "Shirts",
            stock: 100
        },
        {
            _id: "prod3",
            name: "Retro Vibe T-Shirt",
            price: 39,
            image: ["src/img/products/f3.jpg"],
            description: "Vintage style tee for a classic retro look",
            category: "T-Shirts",
            stock: 100
        },
        {
            _id: "prod4",
            name: "Monochrome Streetwear",
            price: 60,
            image: ["src/img/products/f4.jpg"],
            description: "Stylish streetwear with a monochrome palette",
            category: "Streetwear",
            stock: 100
        },
        {
            _id: "prod5",
            name: "Bold Text Graphic Tee",
            price: 48,
            image: ["src/img/products/f5.jpg"],
            description: "Graphic tee with bold textual prints",
            category: "T-Shirts",
            stock: 100
        },
        {
            _id: "prod6",
            name: "Pastel Sunset Top",
            price: 54,
            image: ["src/img/products/f6.jpg"],
            description: "Soft pastel top inspired by sunset hues",
            category: "Tops",
            stock: 100
        },
        {
            _id: "prod7",
            name: "Classic Cotton Crew",
            price: 42,
            image: ["src/img/products/f7.jpg"],
            description: "Timeless crew neck made from pure cotton",
            category: "T-Shirts",
            stock: 100
        },
        {
            _id: "prod8",
            name: "Galaxy Print Tee",
            price: 65,
            image: ["src/img/products/f8.jpg"],
            description: "Eye-catching t-shirt with galaxy print",
            category: "T-Shirts",
            stock: 100
        }
    ];

    const newArrivals = [
        {
            _id: "prod9",
            name: "Abstract Art Tee",
            price: 58,
            image: ["src/img/products/n1.jpg"],
            description: "Tee featuring abstract art design",
            category: "T-Shirts",
            stock: 100
        },
        {
            _id: "prod10",
            name: "Grunge Layered Shirt",
            price: 64,
            image: ["src/img/products/n2.jpg"],
            description: "Layered shirt with a grunge aesthetic",
            category: "Shirts",
            stock: 100
        },
        {
            _id: "prod11",
            name: "Wave Pattern Tee",
            price: 50,
            image: ["src/img/products/n3.jpg"],
            description: "Comfortable tee with wave pattern print",
            category: "T-Shirts",
            stock: 100
        },
        {
            _id: "prod12",
            name: "Dreamcore Aesthetic Top",
            price: 62,
            image: ["src/img/products/n4.jpg"],
            description: "Top with dreamy visuals and soft colors",
            category: "Tops",
            stock: 100
        },
        {
            _id: "prod13",
            name: "Skyline Silhouette Tee",
            price: 55,
            image: ["src/img/products/n5.jpg"],
            description: "Tee featuring urban skyline silhouette",
            category: "T-Shirts",
            stock: 100
        },
        {
            _id: "prod14",
            name: "Neo Tokyo Street Shirt",
            price: 70,
            image: ["src/img/products/n6.jpg"],
            description: "Streetwear inspired by Neo Tokyo style",
            category: "Shirts",
            stock: 100
        },
        {
            _id: "prod15",
            name: "Vintage Camera Tee",
            price: 49,
            image: ["src/img/products/n7.jpg"],
            description: "T-shirt with vintage camera graphic",
            category: "T-Shirts",
            stock: 100
        },
        {
            _id: "prod16",
            name: "Cyberwave Mesh Tee",
            price: 68,
            image: ["src/img/products/n8.jpg"],
            description: "Mesh tee with cyberpunk-inspired design",
            category: "T-Shirts",
            stock: 100
        }
    ];

    return (
        <div>
            <section
                className="h-[40vh] w-full flex flex-col justify-center items-center text-center bg-cover bg-center px-4"
                style={{ backgroundImage: 'url(src/img/banner/b1.jpg)' }}
            >
                <h2 className="text-white text-5xl font-bold">#StayHome</h2>
                <p className="text-white text-lg mt-2">Save more with coupons & up to 70% off!</p>
            </section>
            <div className="mt-12"> {/* Add space between Features and ProductSection */}
                <ProductSection
                    title="Featured Products"
                    subtitle="Summer Collection new Modern Design"
                    products={featuredProducts}
                />
            </div>
            <div className="mt-12"> {/* Add space between Banner and next ProductSection */}
                <ProductSection
                    title="New Arrivals"
                    subtitle="Summer Collection new Modern Design"
                    products={newArrivals}
                />
            </div>
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
        </div>
    );
}
