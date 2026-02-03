
import { Calendar, Clock, ExternalLink, MapPin, Package, ShoppingBag, Star } from 'lucide-react';


export default async function AdminOrdersTable({ medicines }: { medicines: any[] }) {
    return (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <ShoppingBag className="text-blue-600" size={22} /> Recent Orders
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Order Details</th>
                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Address</th>
                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Amount</th>
                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {medicines.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">

                                {/* Medicine & ID */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                            {order.medicine.image && order.medicine.image.length > 15 ? (
                                                <img src={order.medicine.image} alt={order.medicineName} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs font-bold text-slate-400">IMG</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 capitalize leading-none mb-1">{order.medicineName}</p>
                                            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">ID: {order.id.split('-')[0]}...</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Shipping Address */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <MapPin size={14} className="text-slate-400 shrink-0" />
                                        <span className="text-sm truncate max-w-[150px]">{order.shippingAddress}</span>
                                    </div>
                                </td>

                                {/* Amount & Qty */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-black text-slate-900">${parseFloat(order.totalAmount).toFixed(2)}</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{order.quantity} Unit(s)</span>
                                    </div>
                                </td>

                                {/* Status Badge */}
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border" >
                                        {order.status}
                                    </span>
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col text-slate-500">
                                        <div className="flex items-center gap-1 text-sm">
                                            <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px]">
                                            <Clock size={10} /> {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}