import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-blue-600 tracking-tight">
                            MEDI<span className="text-slate-800">STORE</span>
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Your trusted partner in health. Providing quality medicines,
                            wellness products, and expert advice delivered to your doorstep.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Twitter size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Medicines', 'Personal Care', 'Baby Care', 'Health Devices', 'Wellness'].map((item) => (
                                <li key={item}>
                                    <Link href={`#`} className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Support</h3>
                        <ul className="space-y-3">
                            {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Track Order', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3 text-sm text-slate-600">
                                <MapPin size={18} className="text-blue-600 shrink-0" />
                                <span>123 Health Ave, Medical District,<br />Digital City, 56789</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-slate-600">
                                <Phone size={18} className="text-blue-600 shrink-0" />
                                <span>+1 (555) 000-MEDI</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-slate-600">
                                <Mail size={18} className="text-blue-600 shrink-0" />
                                <span>support@medistore.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-12 border-slate-200" />

                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-slate-500">
                    <p>© {currentYear} MEDI STORE. All rights reserved.</p>
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            System Status: Online
                        </span>
                        <div className="flex gap-2">
                            {/* Simple Payment Icons Placeholders */}
                            <div className="w-8 h-5 bg-slate-200 rounded"></div>
                            <div className="w-8 h-5 bg-slate-200 rounded"></div>
                            <div className="w-8 h-5 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;