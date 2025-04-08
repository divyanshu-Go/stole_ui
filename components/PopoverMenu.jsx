import React, { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";

const PopoverMenu = ({ element, setStatusUpdateInfo, setStatusDialogOpen }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  const handleClickOutside = (e) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusClick = (status) => {
    setStatusUpdateInfo({
      elementId: element._id,
      elementCategory: element.category,
      currentStatus: element.status,
      newStatus: status,
      title: element.title,
    });
    setStatusDialogOpen(true);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        className="p-2 rounded hover:bg-slate-300 hover:text-zinc-950 transition"
        onClick={() => setOpen(!open)}
      >
        <Settings className="w-4 h-4" />
      </button>

      {/* Popover Panel */}
      {open && (
        <div className="absolute right-9 -top-14 mt-2 w-40 rounded-md shadow-lg bg-zinc-900 border border-zinc-700 z-[100]">
          <div className="flex flex-col p-1 ">
            {["pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusClick(status)}
                className="text-left px-4 py-2 text-sm capitalize text-white hover:bg-zinc-700 rounded transition"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopoverMenu;
