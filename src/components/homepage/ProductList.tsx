"use client";
import { env } from "@/env"
import React, { useState, useEffect } from 'react';
import { Plus, Pill, ArrowRight } from 'lucide-react';
import Link from "next/link";



interface Medicine {
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
  category: string;
  strength: string;
}

const ProductList = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  console.log(medicines);

const API_URL = env.NEXT_PUBLIC_API_URL;

  
  // Logic to determine how many items to show
  const displayLimit = showAll ? 12 : 4;
  const visibleProducts = medicines.slice(0, displayLimit);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`${API_URL}/api/medicines`);
        const data = await response.json();
        
        setMedicines(data?.data?.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [API_URL]);

  if (loading) return <ProductSkeleton />;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Essential Medicines</h2>
            <p className="text-slate-500 mt-2">Quality assured healthcare products delivered to you.</p>
          </div>
          <div className="hidden md:block">
            <Link href={`/medicine`} className="text-sm font-medium text-blue-600 flex items-center gap-1 cursor-pointer hover:underline">
              View Pharmacy Catalog <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div 
              key={product.id} 
              className="group border border-slate-100 rounded-2xl p-4 hover:shadow-xl hover:border-blue-100 transition-all duration-300 bg-white"
            >
              <div className="relative h-48 w-full mb-4 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                 {/* Placeholder for Product Image */}
                 <Pill className="text-slate-200 w-20 h-20 group-hover:scale-110 transition-transform duration-500" />
                  <img src={product.image} alt={product.name} className="object-contain p-4" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">{product.category}</span>
                <h3 className="font-bold text-xl text-slate-800 truncate">{product.name}</h3>
                <h6 className=" text-slate-800 truncate">{product?.description}</h6>
                {/* <p className="text-xs text-slate-500">{product.strength}</p> */}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">$ 10</span>
                <button className="bg-slate-900 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        {medicines.length > 4 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border-2 border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
            >
              {showAll ? 'Show Less' : 'Show More Products'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Loading State Skeleton
const ProductSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="animate-pulse border border-slate-100 rounded-2xl p-4">
        <div className="h-48 bg-slate-100 rounded-xl mb-4" />
        <div className="h-4 bg-slate-100 rounded w-1/4 mb-2" />
        <div className="h-5 bg-slate-100 rounded w-3/4 mb-2" />
        <div className="h-4 bg-slate-100 rounded w-1/2" />
      </div>
    ))}
  </div>
);

export default ProductList;