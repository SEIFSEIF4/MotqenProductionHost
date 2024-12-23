"use client";

import { LinkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
export const CopyUrlButton = () => {
  const pathname = usePathname();

  const copyToClipboard = async () => {
    const url = `${window.location.origin}${pathname}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <button onClick={copyToClipboard} className="inline-flex items-center">
      <LinkIcon className="text-[#384250]" aria-label="Copy page URL" />
    </button>
  );
};
