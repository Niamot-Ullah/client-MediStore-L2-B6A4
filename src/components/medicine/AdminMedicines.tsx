
import { Package, Star } from 'lucide-react';


export default async function AdminMedicinesTable({ medicines }: { medicines: any[] }) {
    return (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Inventory Management</h2>
                    <p className="text-sm text-slate-500">Total Medicines: {medicines.length}</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Medicine</th>
                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Stock</th>
                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Price</th>
                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {medicines.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                {/* Medicine Info */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
                                            {item.image && item.image.length > 10 ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <Package className="text-slate-300" size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-900 capitalize">{item.name}</span>
                                                {item.isFeatured && (
                                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px]">{item.description}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Stock Level */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className={`text-sm font-bold ${item.stock < 10 ? 'text-orange-500' : 'text-slate-700'}`}>
                                            {item.stock} Units
                                        </span>
                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${item.stock < 10 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${Math.min(item.stock, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="px-6 py-4">
                                    <span className="font-black text-slate-900">${parseFloat(item.price).toFixed(2)}</span>
                                </td>

                                {/* Status Badge */}
                                <td className="px-6 py-4">
                                    {item.stock > 0 ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                            Available
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                            Out of Stock
                                        </span>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}