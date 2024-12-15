"use client";
import React from "react";

const ClientButton = ({ title }: { title: string }) => (
  <button
    className="mt-8 inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-black shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
    onClick={() => {
      const targetSection = document.getElementById("programs");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }}
  >
    {title}
  </button>
);

export default ClientButton;
