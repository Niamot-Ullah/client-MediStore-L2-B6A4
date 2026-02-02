"use client";

import React, { useState, useEffect } from 'react';
import { Tag, AlignLeft, Save, X, Loader2 } from 'lucide-react';

interface CategoryData {
    name: string;
    description: string;
}

interface CategoryFormProps {
    initialData?: CategoryData;
    onSubmit: (data: CategoryData) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

const CategoryForm = ({ initialData, onSubmit, onCancel, isLoading = false }: CategoryFormProps) => {
    const [formData, setFormData] = useState<CategoryData>({
        name: "",
        description: ""
    });


    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);

        if (!initialData) setFormData({ name: "", description: "" });
    };

    const isUpdate = !!initialData;

    return (
        <div className="w-full max-w-lg mx-auto bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                    {isUpdate ? 'Update Category' : 'Create New Category'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    {isUpdate ? 'Modify the details of your existing category.' : 'Add a new group for your medicines.'}
                </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">


                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Tag size={14} className="text-blue-600" /> Category Name
                    </label>
                    <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Antibiotics"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none"
                    />
                </div>


                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <AlignLeft size={14} className="text-blue-600" /> Description
                    </label>
                    <textarea
                        required
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="What kind of medicines belong here?"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none resize-none"
                    />
                </div>


                <div className="flex items-center gap-3 pt-4">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-4 px-6 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <X size={18} /> Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-[2] py-4 px-6 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-100 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-slate-900'
                            }`}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <Save size={18} />
                        )}
                        {isUpdate ? 'Save Changes' : 'Create Category'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;