"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function DownloadPdf() {
    return (
        <Button
            className="w-fit"
            onClick={() => {
                const link = document.createElement("a");
                link.href = "/إقرار الإفصاح المجلس للموقع.pdf";
                link.download = "إقرار الإفصاح المجلس للموقع.pdf";
                link.click();
            }}
        >
            إقرار الإفصاح
        </Button>
    );
}
