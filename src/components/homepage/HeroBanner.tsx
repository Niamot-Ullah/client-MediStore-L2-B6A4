import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import banner from "@/banner.jpg";

interface HeroBannerProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    imageUrl: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
    title,
    subtitle,
    ctaText,
    ctaLink,
    imageUrl,
}) => {
    return (
        <section className="relative w-full bg-blue-50 overflow-hidden rounded-2xl">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center">

                {/* Text Content */}
                <div className="w-full md:w-1/2 z-10 text-center md:text-left mb-10 md:mb-0">
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                        Verified Medical Supplies
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                        {title}
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-lg">
                        {subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href={ctaLink}
                            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            {ctaText}
                        </Link>
                        <Link href={`/blogs`} className="px-8 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-white transition-all">
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Image Container */}
                <div className="w-full rounded-2xl md:w-1/2 relative h-[300px] md:h-[450px]">
                    <Image
                        src="/banner.jpg" 
                        alt="Medical Store Hero"
                        fill
                        className="object-contain rounded-2xl"
                        priority
                    />
                </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30" />
        </section>
    );
};

export default HeroBanner;