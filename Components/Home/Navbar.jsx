import Link from "next/link";
import React from "react";
import logo from "../../app/logo.png";
import Image from "next/image";
const Navbar = () => {
  return (
    <header className="hidden md:block lg:block xl:block w-full bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="Vits Catalogue"
              className="w-12 h-12 rounded-md"
            />
          </Link>
          {/* <h1 className="text-2xl font-bold">Vits Catalogue</h1> */}
        </div>

        {/* Center - Nav Links */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link href="/" className="hover:text-green-100 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-green-100 transition">
            About
          </Link>
          {/* <a href="/catalogue" className="hover:text-green-100 transition">
            View Catalogues
          </a> */}
          <Link href="/pricing" className="hover:text-green-100 transition">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-green-100 transition">
            Contact
          </Link>
        </nav>

        {/* Right - Login/Register */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition transform hover:scale-105"
          >
            Login / Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
