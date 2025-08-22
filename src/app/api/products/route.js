import { NextResponse } from "next/server";
import clientPromise from "@/Lib/mongodb";

// Fetch products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("product_next"); // your DB name
    const products = await db.collection("productsCollection").find({}).toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

// Add a new product
export async function POST(req) {
  try {
    const { title, description, price, image } = await req.json();

    if (!title || !description || !price) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("product_next"); // your DB name

    const result = await db.collection("productsCollection").insertOne({
      title,
      description,
      price: parseFloat(price),
      image: image || "",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Product added", productId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
