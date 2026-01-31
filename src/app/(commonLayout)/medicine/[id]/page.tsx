
import {
    Plus,
    Minus,
    ShoppingCart,
    ShieldCheck,
    Truck,
    RotateCcw,
    AlertCircle,
    Stethoscope,
    Info
} from 'lucide-react';
import { medicineService } from '@/services/medicine.service';
import { orderService } from '@/services/order.service';
import BuyButton from '@/components/medicine/BuyButton';
import Reviews from '@/components/medicine/Reviews';



export default async function MedicineDetails({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    const data = await medicineService.getMedicineById(id);
    const medicine = data?.data?.data
    const numericPrice = parseFloat(medicine.price);

    // const reviews = medicine?.reviews
    // console.log(medicine);
    // console.log(reviews);

    return (
        <div>
            <main className="bg-white min-h-screen pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

                    {/* Breadcrumb */}
                    <nav className="text-sm text-slate-400 mb-8">
                        <span className="hover:text-blue-600 cursor-pointer transition-colors">Home</span> /
                        <span className="hover:text-blue-600 cursor-pointer transition-colors mx-2">{medicine?.category?.name}</span> /
                        <span className="text-slate-900 font-medium mx-2">{medicine?.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Left: Product Image */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 flex items-center justify-center p-12">
                                <img
                                    src={medicine.image}
                                    alt={medicine.name}
                                    className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                        </div>

                        {/* Right: Product Info */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {medicine?.category?.name}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-2">{medicine.name}</h1>
                                <p className="text-lg text-slate-500 font-light leading-relaxed">{medicine.description}</p>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-4xl font-black text-slate-900">${numericPrice.toFixed(2)}</span>
                                <div className="h-8 w-px bg-slate-200" />
                                <span className={`text-sm font-bold ${medicine.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {medicine.stock > 0 ? `In Stock (${medicine.stock} units)` : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Safety Alert */}
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 flex gap-4">
                                <AlertCircle className="text-amber-600 shrink-0" />
                                <p className="text-sm text-amber-800">
                                    <strong>Prescription Required:</strong> This medication requires a valid doctor's prescription to be uploaded at checkout.
                                </p>
                            </div>

                            {/* Quantity and CTA */}
                            <div className="flex flex-wrap gap-4 mb-10">
                                //BUYING BUTTON
                                <BuyButton medicineId={medicine.id} />

                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-t border-slate-100">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <ShieldCheck size={20} className="text-blue-600" />
                                    <span className="text-xs font-medium">100% Authentic</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Truck size={20} className="text-blue-600" />
                                    <span className="text-xs font-medium">Fast Delivery</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <RotateCcw size={20} className="text-blue-600" />
                                    <span className="text-xs font-medium">7 Days Return</span>
                                </div>
                            </div>

                            {/* Detailed Tabs (Simplified for brevity) */}
                            <div className="mt-8 space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <Stethoscope size={24} className="text-blue-600 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">How to use</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{medicine.usage}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <Info size={24} className="text-blue-600 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">Side Effects</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{medicine.sideEffects}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Reviews medicine={medicine}></Reviews>
        </div>
        // <div>hello</div>
    );
}