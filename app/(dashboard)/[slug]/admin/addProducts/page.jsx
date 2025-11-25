"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const [user, setUser] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function addProduct(data) {
    setLoading(true);
    const resp = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, ownerId: user.id }),
    });
    if (resp.status === 200) {
      toast.success("Product Added successfully to catalogue");
      setLoading(false);
      reset();
      fetchProducts();
    } else {
      toast.success("Error Occured while adding product");
    }
  }

  async function deleteProduct(id) {
    setLoading(false);
    const resp = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (resp.status === 200) {
      toast.success("Product Deleted successfully");
      setLoading(false);
      fetchProducts();
    } else {
      toast.success("Error Occured while Deleting product");
    }
    fetchProducts();
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    fetchProducts();
  }, []);

  return (
    <main className="p-6 min-h-screen bg-gray-100 mb-10">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <form
        onSubmit={handleSubmit(addProduct)}
        className="grid grid-cols-2 gap-4 mb-8 bg-white p-4 rounded-xl shadow"
      >
        <input
          {...register("name")}
          placeholder="Product Name"
          className="border p-2 rounded"
          required
        />
        <input
          {...register("price")}
          placeholder="Price"
          type="number"
          className="border p-2 rounded"
          required
        />
        <input
          {...register("imageUrl")}
          placeholder="Image URL"
          className="border p-2 rounded"
          required
        />
        <input
          {...register("category")}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="col-span-2 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded col-span-2 hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
            <p className="text-gray-700">₹{p.price}</p>
            <p className="text-sm text-gray-500">{p.category}</p>
            <button
              onClick={() => deleteProduct(p.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AddProduct;
