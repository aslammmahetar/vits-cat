import { prisma } from "../../../../lib/prisma";

async function Catalogue() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="min-h-screen p-6 bg-gray-50 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Product Catalogue</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <h2 className="text-xl font-bold mb-6 text-center">
            No Product Available
          </h2>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.categody}</p>
              <p className="text-gray-800 font-bold mt-1">₹{p.price}</p>
              <p className="text-sm text-gray-500 mt-1">{p.description}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Catalogue;
