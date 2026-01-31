"use client";

import React, { useState } from 'react';
import { 
  User, 
  Package, 
  FileText, 
  Settings, 
  LogOut, 
  Camera, 
  ShieldCheck,
  MapPin,
  CreditCard
} from 'lucide-react';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  

  // Mock User Data
  const userData = {
    name: "Alex Thompson",
    email: "alex.t@example.com",
    role: "ADMIN",
    phone: "+1 (555) 000-1234",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    memberSince: "Jan 2024",
    bloodGroup: "O+",
  };

  const menuItems = [
    { id: 'personal', label: 'Personal Info', icon: <User size={18} /> },
    { id: 'orders', label: 'My Orders', icon: <Package size={18} /> },
    { id: 'prescriptions', label: 'Prescriptions', icon: <FileText size={18} /> },
    { id: 'security', label: 'Security', icon: <ShieldCheck size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-72 space-y-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img 
                  src={userData.avatar} 
                  className="rounded-full object-cover border-4 border-blue-50" 
                  alt="Profile" 
                />
                {/* <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 shadow-lg transition-transform active:scale-90">
                  <Camera size={14} />
                </button> */}
              </div>
              <h2 className="font-bold text-slate-900 text-lg">{userData.name} ({userData.role})</h2>
              <p className="text-sm text-slate-500">{userData.email}</p>
            </div>

            <nav className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all ${
                    activeTab === item.id 
                    ? "text-blue-600 bg-blue-50/50 border-r-4 border-blue-600" 
                    : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-all border-t border-slate-50">
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-grow bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            
            {activeTab === 'personal' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
                  <button className="text-sm font-semibold text-blue-600 hover:underline">Edit Profile</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                    <p className="text-slate-900 font-medium py-2 border-b border-slate-100">{userData.name}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                    <p className="text-slate-900 font-medium py-2 border-b border-slate-100">{userData.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                    <p className="text-slate-900 font-medium py-2 border-b border-slate-100">{userData.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Blood Group</label>
                    <p className="text-slate-900 font-medium py-2 border-b border-slate-100">{userData.bloodGroup}</p>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <MapPin size={18} className="text-blue-600" /> Saved Addresses
                  </h4>
                  <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold">Home</p>
                      <p className="text-xs text-slate-500">123 Health Ave, Medical District, City 10101</p>
                    </div>
                    <button className="text-xs font-bold text-slate-400 hover:text-slate-600">Remove</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="text-center py-20">
                <Package size={48} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No active orders</h3>
                <p className="text-slate-500 text-sm">Items you purchase will appear here.</p>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'personal' && activeTab !== 'orders' && (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                Content for {activeTab} coming soon...
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;