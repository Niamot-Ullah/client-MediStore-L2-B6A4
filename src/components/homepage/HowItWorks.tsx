import React from 'react';
import { Search, ClipboardCheck, Truck, PackageCheck } from 'lucide-react';
import Link from 'next/link';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Search & Select",
            description: "Browse our extensive catalog of medicines and healthcare products with ease.",
            icon: <Search className="w-8 h-8 text-blue-600" />,
            color: "bg-blue-50"
        },
        {
            id: 2,
            title: "Upload Prescription",
            description: "Securely upload your doctor's prescription for verified medication orders.",
            icon: <ClipboardCheck className="w-8 h-8 text-emerald-600" />,
            color: "bg-emerald-50"
        },
        {
            id: 3,
            title: "Pharmacist Review",
            description: "Our certified pharmacists verify your order and prepare your package safely.",
            icon: <PackageCheck className="w-8 h-8 text-purple-600" />,
            color: "bg-purple-50"
        },
        {
            id: 4,
            title: "Doorstep Delivery",
            description: "Get your medicines delivered right to your door within 24-48 hours.",
            icon: <Truck className="w-8 h-8 text-orange-600" />,
            color: "bg-orange-50"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        How <span className="text-blue-600">MEDI STORE</span> Works
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Ordering your healthcare essentials is simple, secure, and fast.
                        Follow these four easy steps to get started.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative group">
                            {/* Connection Line (Desktop only) */}
                            {index !== steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-slate-100 group-hover:bg-blue-100 transition-colors" />
                            )}

                            <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100">
                                {/* Icon Container */}
                                <div className={`mb-6 p-5 ${step.color} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                                    {step.icon}
                                </div>

                                {/* Step Number Badge */}
                                <span className="absolute top-4 right-4 text-4xl font-black text-slate-50 select-none">
                                    0{step.id}
                                </span>

                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <Link href={`/medicine`} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-blue-200">
                        Start Your First Order
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;