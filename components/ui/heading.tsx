import React from "react";
import { cn } from "@/lib/utils";

function SubTitle({ text, className }: { text: string; className?: string }) {
  return (
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="h-9 w-2 rounded-lg bg-secondary" aria-hidden="true" />
      <h1 className={cn("text-3xl font-bold text-black", className)}>{text}</h1>
    </div>
  );
}

export { SubTitle };
