"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

// ... in RegisterPage.js
// ... in RegisterPage.js
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to register");
    }

    Swal.fire("Successfully registered");

    // Correctly call signIn
    const signInRes = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false, // Keep this as false
      callbackUrl: "/auth/login", // This is the URL NextAuth will use if you do redirect: true
    });

    if (signInRes?.error) {
      // The signIn failed, show the error
      console.log("Sign in failed:", signInRes.error);
      setError("Sign in failed after registration. Please try logging in manually.");
    } else {
      // Sign-in was a success, perform the redirect
      router.push("/auth/login");
    }

  } catch (err) {
    console.error("Registration failed:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
