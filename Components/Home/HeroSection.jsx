"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../../app/logo.png";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      {/* Image Section w-full max-w-2xl h-48 sm:h-60 bg-green-200 rounded-2xl shadow-inner  */}
      <section className="flex items-center justify-center overflow-hidden mb-5 mt-10">
        <motion.div
          className="w-full h-full flex items-center justify-center text-green-900 font-medium text-lg sm:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image src={logo} width={"auto"} height={100} alt="hero image" />
        </motion.div>
      </section>
      <section>
        <motion.div
          className="max-w-3xl flex flex-col items-center gap-4 mb-10 p-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Vits Catalogue
          </h1>
          <strong className="text-2xl md:text-lg sm:text-md leading-relaxed text-white">
            “📱 Create Your Free Digital Catalogue In 2 Minutes — with Vits!”
          </strong>
          <p className="text-base sm:text-lg leading-relaxed text-white">
            One platform for{" "}
            <span className="font-semibold text-green-200">retailers</span> and{" "}
            <span className="font-semibold text-green-200">wholesalers</span> to
            list, showcase, and share their products easily —{" "}
            <br className="hidden sm:block" />
            without sending photos and prices manually.
          </p>
        </motion.div>
      </section>

      {/* Buttons Section */}
      <section className="w-full px-4 mb-5">
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Login Button */}
          <Link href="/auth" className="w-full sm:w-auto block sm:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-white bg-green-700 rounded-xl shadow-md overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              Login
            </motion.button>
          </Link>

          {/* Wholesaler Registration */}
          <Link href="/auth?register=1" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full cursor-pointer sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-green-700 bg-white border-2 border-green-500 rounded-xl shadow-md overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-100/40 to-green-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              Get Started For Free! 🎉
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
