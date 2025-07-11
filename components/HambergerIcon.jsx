"use client"

import React, { useState } from "react";

export default function HamburgerIcon({open , setOpen}) {
  

  return (
    <>
      <div
        id="nav-icon3"
        className={open ? "open" : ""}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}
