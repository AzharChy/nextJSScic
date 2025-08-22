"use client";

import { useEffect, useState } from "react";
import bannerImg from '../app/products/banner.webp'
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch 6 random products from the API
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        // Pick 6 random products
        const randomProducts = data
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        setProducts(randomProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Banner Section */}
      
        <div className="container mx-auto text-center">
          {/* Add your image here */}
          <Image src={bannerImg}  width={1280}
      height={200}
      alt="Picture of the author"></Image>
          
          
        </div>
 

      {/* Product Highlights */}
      <div className="my-12 container mx-auto">
        <h1 className="text-center text-2xl font-semibold mb-6">
          Product Highlights
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image || "/placeholder.png"}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2 font-bold">${product.price}</p>
              <button className="mt-4 w-full p-2 bg-violet-600 text-white rounded hover:bg-violet-700">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
