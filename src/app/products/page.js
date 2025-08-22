"use client";
import Loader from "@/Components/Loader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data),
    setLoading(false));
  }, []);
   if(loading){
    return <Loader />
  }

  return (
   <div className="px-6 py-10">
  <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {products.map((product) => (
      <div
        key={product._id}
        className="max-w-xs rounded-xl shadow-lg border border-gray-200 transition hover:shadow-2xl"
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover object-center w-full rounded-t-xl h-72 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-wide">
              {product.name}
            </h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold text-violet-600">
              ${product.price}
            </p>
          </div>
          <Link href={`/products/${product._id}`}>
            <button
              type="button"
              className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-600 text-white hover:bg-violet-700 transition"
            >
              Read more
            </button>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
