
import clientPromise from "@/Lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";

export default async function ProductDetails({ params }) {
  // Wait for params
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("product_next");

  let objectId;
  try {
    objectId = ObjectId.createFromHexString(id);
  } catch (err) {
    return <p className="text-center mt-10">Invalid Product ID</p>;
  }

  const product = await db.collection("productsCollection").findOne({ _id: objectId });

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
           
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-violet-600 mb-2">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Category: {product.category}
            </p>
          </div>
          <button
            className="w-full lg:w-auto px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition"
            
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
