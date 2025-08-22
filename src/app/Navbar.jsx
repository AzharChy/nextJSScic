"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ModeToggle } from "@/Components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const username = session?.user?.name;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    
    { href: "/faq", label: "FAQ" },
    {href: "/Dashboard/add-product", label:"Dashboard" }
  ];

  return (
    <header className="bg-gray-900 text-white sticky top-0 left-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            className="w-8 h-8 text-violet-500"
          >
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742z"></path>
          </svg>
          <span className="text-xl font-bold">ProductApp</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center space-x-6 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`hover:text-violet-400 transition ${
                  pathname === link.href
                    ? "text-violet-500 font-semibold"
                    : "text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
           
          ))}
          <li><ModeToggle /></li>
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="font-medium text-violet-400">
                Hello, {username}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <button className="px-6 py-2 rounded bg-violet-600 text-white hover:bg-violet-700">
                  Sign In
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="px-6 py-2 rounded bg-violet-600 text-white hover:bg-violet-700">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2"
        >
          {mobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-gray-800 px-4 pb-4 space-y-4">
          <ul className="space-y-2 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 ${
                    pathname === link.href
                      ? "text-violet-500 font-semibold"
                      : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-2 space-y-2">
            {isLoggedIn ? (
              <>
                <span className="block text-violet-400 font-medium">
                  Hello, {username}
                </span>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/auth/login" });
                    setMobileOpen(false);
                  }}
                  className="w-full px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full px-6 py-2 rounded bg-violet-600 text-white hover:bg-violet-700"
                  >
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/register">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full px-6 py-2 rounded bg-violet-600 text-white hover:bg-violet-700"
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
