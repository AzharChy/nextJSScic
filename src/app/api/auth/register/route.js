import { NextResponse } from "next/server";
import clientPromise from "@/Lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db("product_next");

  const existingUser = await db.collection("userCollection").findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "Email already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.collection("userCollection").insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "User created", userId: result.insertedId });
}
