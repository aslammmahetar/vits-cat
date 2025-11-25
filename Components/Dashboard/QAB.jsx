"use client";
import { Grid, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const QAB = ({ slug }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [products, setProducts] = useState([]);

  function handleAddProduct() {
    router.push(`/${slug}/admin/addProducts`);
  }

  function handleViewCatalog() {
    router.push(`/${slug}/catalogue`);
  }

  function handleManageSubscription() {
    router.push(`/${slug}/admin/subscription`);
  }

  function handleSettings() {
    router.push(`/${slug}/admin/settings`);
  }
  useEffect(() => {
    // MOCK: replace with real API calls
    async function load() {
      // example: const res = await fetch('/api/auth/me'); const me = await res.json();
      const me = {
        id: 1,
        name: "Ramesh",
        email: "ramesh@example.com",
        slug: slug || "sample-shop",
      };
      setUser(me);
      setPlan({ name: "Growth Plan", expiresAt: "2025-08-01" });

      // sample products
      setProducts([
        {
          id: 1,
          name: "Classic Helmet",
          price: 799,
          category: "Safety",
          image: "",
        },
        {
          id: 2,
          name: 'Road Tyre - 26"',
          price: 499,
          category: "Tyres",
          image: "",
        },
        {
          id: 3,
          name: "Chain Lock",
          price: 299,
          category: "Accessories",
          image: "",
        },
        {
          id: 4,
          name: "LED Headlamp",
          price: 349,
          category: "Electronics",
          image: "",
        },
      ]);
    }
    load();
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Your store link</div>
            <div className="text-sm font-medium text-[#008236]">{`/${slug}/catalogue`}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                navigator.clipboard?.writeText(
                  `${window.location.origin}/${slug}/catalogue`
                )
              }
              className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-md"
            >
              Copy Link
            </button>
            <button
              onClick={handleViewCatalog}
              className="text-sm bg-[#008236] text-white px-3 py-2 rounded-md"
            >
              View
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 flex gap-3 items-center overflow-y-scroll lg:overflow-hidden md:overflow-hidden">
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-[#008236] text-white px-4 py-3 rounded-lg shadow-sm flex-col md:flex-row lg:flex-row"
          >
            <PlusCircle className="w-5 h-5" /> Add Product
          </button>
          <button
            onClick={handleViewCatalog}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-lg flex-col md:flex-row lg:flex-row"
          >
            <Grid className="w-5 h-5 text-[#008236]" /> View Catalogue
          </button>
          <button
            onClick={handleManageSubscription}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-lg flex-col md:flex-row lg:flex-row"
          >
            <Settings className="w-5 h-5 text-[#008236]" /> Manage Plan
          </button>
        </div>

        {/* Recent products */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-gray-600">Recent Products</div>
              <div className="text-lg font-semibold text-gray-800">
                Latest added items
              </div>
            </div>
            <Link
              href={`/${slug}/admin/products`}
              className="text-sm text-[#008236]"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Right column */}
      <aside className="space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Subscription</div>
          <div className="text-lg font-semibold text-gray-800">
            {plan?.name || "Free Starter"}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Expires: {plan?.expiresAt || "Never"}
          </div>
          <button
            className="mt-4 w-full bg-[#008236] text-white py-2 rounded-md"
            onClick={handleManageSubscription}
          >
            Upgrade
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Tips</div>
          <ul className="text-sm text-gray-700 mt-2 space-y-2">
            <li>• Add high-quality images to boost sales.</li>
            <li>• Share via WhatsApp to your customers.</li>
            <li>• Update prices regularly.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default QAB;
