"use client";



interface LoadingEmojiProps {
  emoji?: string;
  label?: string;
}

const LoadingEmoji = ({ emoji = "💊", label = "Fetching medicine..." }: LoadingEmojiProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        {/* Animated Background Rings */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-blue-100 opacity-40 animate-pulse scale-150" />
        
        {/* The Emoji Container */}
        <div className="relative bg-white w-20 h-20 rounded-3xl shadow-xl shadow-blue-50 border border-slate-50 flex items-center justify-center text-4xl animate-bounce">
          <span className="drop-shadow-sm">{emoji}</span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p className="text-sm font-bold text-slate-900 tracking-tight">
          {label}
        </p>
        <div className="flex gap-1 justify-center mt-2">
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default LoadingEmoji;