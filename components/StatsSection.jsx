"use client";

import React, { useEffect, useState } from "react";
import { Boxes, Gift, UsersRound } from "lucide-react";

const StatsSection = () => {
  const [elementCount, setElementCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [elementsRes, usersRes] = await Promise.all([
          fetch("/api/stats/elements"),
          fetch("/api/stats/users"),
        ]);

        const elementsData = await elementsRes.json();
        const usersData = await usersRes.json();

        setElementCount(elementsData.count);
        setUserCount(usersData.count);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex z-[1] py-40 px-6 pt-48 items-center justify-center flex-wrap gap-10 relative">
      <div className="text-center max-w-[200px] h-[200px] flex flex-col items-center">
        <Boxes className="w-10 h-10 md:w-12 md:h-12 mb-4 text-gray-400" />
        <span className="text-4xl font-extrabold font-display md:text-6xl">
          {elementCount}
        </span>
        <p className="mt-2 text-base font-semibold text-gray-400">
          Community-made UI elements
        </p>
      </div>
      <div className="text-center max-w-[200px] h-[200px] flex flex-col items-center">
        <Gift className="w-10 h-10 md:w-12 md:h-12 mb-4 text-gray-400" />
        <span className="text-4xl font-extrabold font-display md:text-6xl">
          100%
        </span>
        <p className="mt-2 text-base font-semibold text-gray-400">
          Free for personal and commercial use
        </p>
      </div>
      <div className="text-center max-w-[200px] h-[200px] flex flex-col items-center">
        <UsersRound className="w-10 h-10 md:w-12 md:h-12 mb-4 text-gray-400" />
        <span className="text-4xl font-extrabold font-display md:text-6xl">
          {userCount}
        </span>
        <p className="mt-2 text-base font-semibold text-gray-400">
          Users worldwide
        </p>
      </div>

    </div>
  );
};

export default StatsSection;
