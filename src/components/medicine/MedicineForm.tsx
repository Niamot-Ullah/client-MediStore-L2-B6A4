"use client";

import React, { useEffect, useState } from "react";
import {
    Package,
    Tag,
    DollarSign,
    Layers,
    Image as ImageIcon,
    Send,
} from "lucide-react";
import { toast } from "sonner";

type Category = {
    id: string;
    name: string;
};

const MedicineForm = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    // console.log(categories);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryId: "",
        price: "",
        stock: "",
        image: "",
        isFeatured: false,
    });
    // console.log(formData);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                const result = await res.json();

                if (!res.ok || !result.success) {
                    throw new Error(result.message || "Failed to fetch categories");
                }

                setCategories(result.data);
            } catch (err) {
                toast.error("Failed to load categories");
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);


    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : type === "number"
                        ? Number(value)
                        : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading('Adding...')

        if (!formData.categoryId) {
            toast.error('Please select a category', { id: toastId })
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/medicines`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(formData),
                }
            );

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);
            toast.success("Medicine created successfully!", { id: toastId });
        } catch (err: any) {
            toast.error(err.message || "Failed to create medicine", { id: toastId });
        }
    };


    return (
        <div className="max-w-3xl mx-auto my-12 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-100">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add New Medicine</h2>
                <p className="text-slate-500 mt-2">Update your MEDI STORE inventory with precision.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name Field */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Package size={14} /> Product Name
                    </label>
                    <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Paracetamol Extra"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none"
                    />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Tag size={14} /> Description
                    </label>
                    <textarea
                        required
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the medicine usage and benefits..."
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none resize-none"
                    />
                </div>

                {/* Category Selector */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Layers size={14} /> Category
                    </label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        disabled={loadingCategories}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                    >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price Field */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <DollarSign size={14} /> Price ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>

                    {/* Stock Field */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Image URL Field */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <ImageIcon size={14} /> Image URL
                    </label>
                    <div className="flex gap-4">
                        <input
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="flex-grow px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none"
                        />
                       
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-6 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                >
                    <Send size={18} /> Add Medicine
                </button>
            </form>
        </div>
    );
};

export default MedicineForm;
