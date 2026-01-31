"use client";

import React, { useEffect, useState } from "react";
import { Pill, Activity } from "lucide-react";

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) return 100;
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-60 animate-pulse delay-700" />
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-20" />
          <div className="absolute inset-0 rounded-full bg-blue-200 animate-pulse opacity-40 scale-150" />

          <div className="relative bg-white p-6 rounded-full shadow-2xl border border-blue-50 z-10">
            <Pill className="w-12 h-12 text-blue-600 animate-bounce" />
          </div>

          <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-lg text-white shadow-lg animate-pulse">
            <Activity size={16} />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
            MEDI<span className="text-blue-600">STORE</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.3em] pl-1">
            Verifying Quality
          </p>
        </div>

        <div className="mt-12 w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="mt-3 text-[10px] font-black text-blue-600 font-mono">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="absolute bottom-10 flex items-center gap-2 text-slate-400">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-xs font-medium tracking-wide">
          SECURE ENCRYPTED CONNECTION
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
