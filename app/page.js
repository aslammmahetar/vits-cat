import Footer from "../Components/Home/Footer";
import HeroSection from "../Components/Home/HeroSection";
import Navbar from "../Components/Home/Navbar";

export default function Home() {
  return (
    <main className="bg-image w-full min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 flex flex-col items-center text-center">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />
      {/* Footer Message */}
      <Footer />
    </main>
  );
} 
