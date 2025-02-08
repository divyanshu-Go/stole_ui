import React from "react";

const StatsSection = () => {
  return (
    <div className="flex z-[1] py-40 px-6 pt-48 items-center justify-center flex-wrap gap-10 relative">
      <div className=" text-center max-w-[200px] h-[200px] flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-8 h-8 md:w-10 md:h-10 mb-4 text-gray-400"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M3 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 3 5.08 3 6.2 3h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C10 4.52 10 5.08 10 6.2v2.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C8.48 12 7.92 12 6.8 12h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 10.48 3 9.92 3 8.8V6.2Z"></path>
          <path d="M3 18.5c0-.465 0-.697.038-.89a2 2 0 0 1 1.572-1.572C4.803 16 5.035 16 5.5 16h2c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89s0 .697-.038.89a2 2 0 0 1-1.572 1.572C8.197 21 7.965 21 7.5 21h-2c-.465 0-.697 0-.89-.038a2 2 0 0 1-1.572-1.572C3 19.197 3 18.965 3 18.5Z"></path>
          <path d="M14 5.5c0-.465 0-.697.038-.89a2 2 0 0 1 1.572-1.572C15.803 3 16.035 3 16.5 3h2c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89s0 .697-.038.89a2 2 0 0 1-1.572 1.572C19.197 8 18.965 8 18.5 8h-2c-.465 0-.697 0-.89-.038a2 2 0 0 1-1.572-1.572C14 6.197 14 5.965 14 5.5Z"></path>
          <path d="M14 15.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C15.52 12 16.08 12 17.2 12h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 13.52 21 14.08 21 15.2v2.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C14 19.48 14 18.92 14 17.8v-2.6Z"></path>
        </svg>
        <span className="text-4xl font-extrabold font-display md:text-6xl">5,839</span>
        <p className="mt-2 text-base font-semibold text-gray-400">
          Community-made UI elements
        </p>
      </div>
      <div className="text-center max-w-[200px] h-[200px] flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8 md:w-10 md:h-10 mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M4.222 12h15.556M4.222 12v5.556c0 1.555 0 2.333.303 2.927.266.523.691.948 1.214 1.214C6.333 22 7.11 22 8.667 22h6.666c1.556 0 2.334 0 2.928-.303a2.777 2.777 0 0 0 1.214-1.214c.303-.594.303-1.372.303-2.927V12M4.222 12c-.31 0-.464 0-.594-.018a1.889 1.889 0 0 1-1.61-1.61C2 10.242 2 10.087 2 9.778c0-.31 0-.465.018-.595a1.889 1.889 0 0 1 1.61-1.61c.13-.017.285-.017.594-.017h15.556c.31 0 .464 0 .594.018a1.889 1.889 0 0 1 1.61 1.61c.018.13.018.284.018.594s0 .464-.018.594a1.889 1.889 0 0 1-1.61 1.61c-.13.018-.285.018-.594.018M12 7.556h2.778A2.778 2.778 0 1 0 12 4.778m0 2.778V4.778m0 2.778V22m0-14.444H9.222A2.778 2.778 0 1 1 12 4.778"></path>
        </svg>
        <span className="text-4xl font-extrabold font-display md:text-6xl">
          100%
        </span>
        <p className="mt-2 text-base font-semibold text-gray-400">
          Free for personal and commercial use
        </p>
      </div>
      <div className="text-center max-w-[200px] h-[200px] flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="w-8 h-8 md:w-10 md:h-10 mb-4 text-gray-400"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M7.328 8.191a2.596 2.596 0 1 1 0-5.191 2.596 2.596 0 0 1 0 5.191Zm0 0c1.931 0 3.638.959 4.672 2.426a5.704 5.704 0 0 1 4.672-2.426m-9.344 0a5.704 5.704 0 0 0-4.672 2.426m14.016-2.426a2.596 2.596 0 1 1 0-5.191 2.596 2.596 0 0 1 0 5.191Zm0 0c1.931 0 3.639.959 4.672 2.426M7.328 18.575a2.596 2.596 0 1 1 0-5.192 2.596 2.596 0 0 1 0 5.192Zm0 0c1.931 0 3.638.959 4.672 2.426m-4.672-2.426a5.704 5.704 0 0 0-4.672 2.426m14.016-2.426a2.596 2.596 0 1 1 0-5.192 2.596 2.596 0 0 1 0 5.192Zm0 0c1.932 0 3.639.959 4.672 2.426"></path>
        </svg>
        <span className="text-4xl font-extrabold font-display md:text-6xl">
          115k+
        </span>
        <p className="mt-2 text-base font-semibold text-gray-400">
          Users worldwide
        </p>
      </div>

      <div className="h-52 w-full bg-[var(--background)] absolute -bottom-20 blur-2xl"></div>

    </div>
  );
};

export default StatsSection;
