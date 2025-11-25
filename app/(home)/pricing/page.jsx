"use client";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Navbar from "../../../Components/Home/Navbar";
import Footer from "../../../Components/Home/Footer";

const plans = [
  {
    name: "Free Starter",
    price: "₹0",
    duration: "Forever",
    products: "50 Products",
    ads: "Yes",
    subdomain: "Shared",
    branding: "No",
    support: "Basic Email",
    highlighted: false,
    buttonText: "Start for Free",
  },
  {
    name: "Growth Plan",
    price: "₹199",
    duration: "3 Months",
    products: "200 Products",
    ads: "No",
    subdomain: "Shared",
    branding: "No",
    support: "Priority Email",
    highlighted: true,
    buttonText: "Upgrade Now",
  },
  {
    name: "Business Plan",
    price: "₹499",
    duration: "6 Months",
    products: "500 Products",
    ads: "No",
    subdomain: "Shared",
    branding: "Logo Branding",
    support: "Priority + Analytics",
    highlighted: false,
    buttonText: "Go Pro",
  },
  {
    name: "Enterprise Plan",
    price: "₹999+",
    duration: "Custom",
    products: "Unlimited",
    ads: "No",
    subdomain: "Custom Domain",
    branding: "Full White-label",
    support: "Dedicated",
    highlighted: false,
    buttonText: "Contact Sales",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-white text-gray-800 py-16 px-4 sm:px-8 md:px-12 lg:px-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#008236] mb-3">
            Choose Your Plan
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Select a plan that fits your business — from starting out to scaling
            up.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`relative border rounded-2xl shadow-md p-6 flex flex-col justify-between ${
                plan.highlighted
                  ? "border-[#008236] shadow-lg bg-[#008236]/5"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute top-0 right-0 bg-[#008236] text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                  Recommended
                </span>
              )}

              <div>
                <h2 className="text-xl font-semibold text-[#008236] mb-2">
                  {plan.name}
                </h2>
                <p className="text-3xl font-bold mb-2">{plan.price}</p>
                <p className="text-sm text-gray-500 mb-6">{plan.duration}</p>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#008236]" /> {plan.products}
                  </li>
                  <li className="flex items-center gap-2">
                    {plan.ads === "Yes" ? (
                      <X className="w-4 h-4 text-red-500" />
                    ) : (
                      <Check className="w-4 h-4 text-[#008236]" />
                    )}
                    No Ads
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#008236]" /> Subdomain:{" "}
                    {plan.subdomain}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#008236]" /> Branding:{" "}
                    {plan.branding}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#008236]" /> Support:{" "}
                    {plan.support}
                  </li>
                </ul>
              </div>

              <button
                className={`mt-8 py-2 w-full rounded-lg font-medium text-white ${
                  plan.highlighted
                    ? "bg-[#008236] hover:bg-[#00682c]"
                    : "bg-gray-800 hover:bg-gray-700"
                } transition`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
