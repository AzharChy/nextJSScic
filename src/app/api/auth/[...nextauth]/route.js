import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import clientPromise from "@/Lib/mongodb";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  // ... in [...nextauth]/route.js
async authorize(credentials) {
  try {
    console.log("Attempting to authorize user with email:", credentials.email);
    const client = await clientPromise;
    const db = client.db("product_next");
    const user = await db.collection("userCollection").findOne({ email: credentials.email });

    if (!user) {
      console.log("User not found.");
      return null;
    }
    
    // Log the password comparison result
    const isValid = await bcrypt.compare(credentials.password, user.password);
    console.log("Password comparison result:", isValid);
    
    if (!isValid) {
      console.log("Invalid password.");
      return null;
    }

    console.log("Authorization successful for user:", user.email);
    // Ensure the ID is a string, which you've already done correctly
    return { id: user._id.toString(), name: user.name, email: user.email };
  } catch (err) {
    console.error("Authorization error:", err);
    return null;
  }
},
}),


  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
