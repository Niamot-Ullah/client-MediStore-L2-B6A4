"use client";

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface MedicineProps {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
    image: string;
    isFeatured: boolean;
}

const MedicineCard = ({ medicine }: { medicine: MedicineProps }) => {
    const numericPrice = parseFloat(medicine.price);
    const isOutOfStock = medicine.stock <= 0;

    return (
        <div className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2">

            {/* Top Action Bar */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
                {medicine.isFeatured && (
                    <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-blue-200">
                        Featured
                    </span>
                )}

            </div>

            {/* Image Section */}
            <div className="relative h-56 bg-[#F8FAFC] flex items-center justify-center p-8 overflow-hidden">
                <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Quick Availability Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
                    <div
                        className={`h-full transition-all duration-1000 ${isOutOfStock ? 'bg-red-500 w-full' : 'bg-green-500 w-1/3'}`}
                        style={{ width: isOutOfStock ? '100%' : `${Math.min(medicine.stock, 100)}%` }}
                    />
                </div>
            </div>

            {/* Details Section */}
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {medicine.name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-1 mt-1 font-light">
                        {medicine.description}
                    </p>
                </div>

                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Price</span>
                        <span className="text-2xl font-black text-slate-900 tracking-tight">
                            ${numericPrice.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        {isOutOfStock ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                                <AlertCircle size={12} /> Out of Stock
                            </span>
                        ) : (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                {medicine.stock} units left
                            </span>
                        )}
                        {isOutOfStock ? (
                            <button
                                disabled
                                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 text-slate-300 cursor-not-allowed shadow-md"
                            >
                                <ShoppingCart size={20} />
                            </button>
                        ) : (
                            <Link href={`/medicine/${medicine.id}`}>
                                <button
                                    className="flex items-center hover:cursor-pointer justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white  transition-all shadow-md hover:bg-slate-900 shadow-blue-100 active:scale-90"
                                >
                                    <ShoppingCart size={20} />
                                </button>
                            </Link>
                        )}

                    </div>
                </div>
            </div>

            {/* Secure Transaction Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <ShieldCheck size={14} className="text-slate-400" />
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Quality Verified</span>
            </div>
        </div>
    );
};

export default MedicineCard;