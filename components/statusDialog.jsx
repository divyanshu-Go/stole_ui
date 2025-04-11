import React from "react";

export default function StatusDialog ({
  statusDialogOpen,
  setStatusDialogOpen,
  statusUpdateInfo,
  handleStatusUpdate
}) {
  if (!statusDialogOpen) return null;

  return (
    <div className="fixed inset-0 mx-4 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-zinc-900 text-white rounded-lg shadow-lg max-w-sm w-full p-6 border border-zinc-700">
        {/* Header */}
        <h2 className="text-lg font-semibold text-blue-400">Confirm Status Update</h2>

        {/* Description */}
        <p className="text-sm text-gray-400 mt-2">
          Are you sure you want to update the status of 
          <span className="text-white font-semibold"> {statusUpdateInfo?.elementCategory} </span> 
           from <span className="font-semibold text-yellow-400">"{statusUpdateInfo?.currentStatus}" </span> 
          to <span className="font-semibold text-green-400">"{statusUpdateInfo?.newStatus}" </span>?
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            className="px-4 py-2 text-sm rounded-md bg-zinc-700 hover:bg-zinc-600 transition"
            onClick={() => setStatusDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm rounded-md bg-blue-500 hover:bg-blue-600 transition"
            onClick={() =>
              handleStatusUpdate(statusUpdateInfo?.elementId, statusUpdateInfo?.newStatus)
            }
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

