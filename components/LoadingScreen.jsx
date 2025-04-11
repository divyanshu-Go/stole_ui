"use client";

const LoadingScreen = ({ message = "Loading", className="" }) => {
  return (
    <div className={` flex-grow flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        <div className="flex space-x-2">
          <span className="h-3 w-3 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-3 w-3 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-3 w-3 rounded-full bg-zinc-400 animate-bounce" />
        </div>
        <p className="text-sm text-zinc-400">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
