"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from 'lucide-react';

const Branch = () => {
  const branches = [
    {
      id: 1,
      name: "Central Pharmacy",
      area: "Downtown",
      address: "123 Medical Hub, Downtown, City 10101",
      phone: "+1 (555) 010-8888",
      hours: "Open 24/7",
      isExpress: true,
    },
    {
      id: 2,
      name: "Wellness Point",
      area: "North Hills",
      address: "45 Wellness St, North Hills, City 10204",
      phone: "+1 (555) 010-7777",
      hours: "08:00 AM - 10:00 PM",
      isExpress: false,
    },
    {
      id: 3,
      name: "Care Corner",
      area: "East Side",
      address: "89 Health Avenue, East Side, City 10405",
      phone: "+1 (555) 010-6666",
      hours: "09:00 AM - 09:00 PM",
      isExpress: true,
    },
  ];

  const [selectedId, setSelectedId] = useState(1);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Visit Our Stores</h2>
          <p className="mt-4 text-slate-600">Find a MEDI STORE location nearest to you for immediate assistance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Branch Selection List */}
          <div className="lg:col-span-5 space-y-4">
            {branches.map((branch) => (
              <button
                key={branch.id}
                onClick={() => setSelectedId(branch.id)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedId === branch.id 
                  ? "border-blue-600 bg-white shadow-md" 
                  : "border-transparent bg-slate-100 hover:bg-slate-200 text-slate-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${selectedId === branch.id ? "text-blue-600" : "text-slate-400"}`}>
                      {branch.area}
                    </p>
                    <h3 className={`text-lg font-bold ${selectedId === branch.id ? "text-slate-900" : "text-slate-700"}`}>
                      {branch.name}
                    </h3>
                  </div>
                  {selectedId === branch.id && <CheckCircle2 className="text-blue-600 w-5 h-5" />}
                </div>
              </button>
            ))}
          </div>

          {/* Detailed View Card */}
          <div className="lg:col-span-7">
            {branches.filter(b => b.id === selectedId).map((branch) => (
              <div key={branch.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{branch.name}</h3>
                    <p className="text-slate-500">{branch.area} Branch</p>
                  </div>
                  {branch.isExpress && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 w-fit">
                      Express Pickup Available
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <MapPin className="text-blue-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Address</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{branch.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Phone className="text-blue-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Contact</p>
                        <p className="text-sm text-slate-600">{branch.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Clock className="text-blue-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Opening Hours</p>
                        <p className="text-sm text-slate-600">{branch.hours}</p>
                      </div>
                    </div>
                  </div>

                  {/* Placeholder for a Map or Image */}
                  <div className="h-48 md:h-full min-h-[200px] bg-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i13!2i4096!3i2725!2m3!1e0!2sm!3i633140934!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e4!23i1301875!46m2!1e1!2b1!47m31!1m3!1m2!1i2048!2i1536!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE!4m2!1e1!2b1!4m5!1e1!2b1!3m2!1i1!2i1!4m2!1e6!2b1!4m2!1e10!2b1!4m2!1e14!2b1!5m1!1e0!6m1!1e1')] bg-cover opacity-60"></div>
                    <button className="relative z-10 bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                      <Navigation size={16} /> Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Branch;