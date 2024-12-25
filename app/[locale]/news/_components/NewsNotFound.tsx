"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

const NewsNotFound = ({
  condition,
  id,
}: {
  condition: boolean;
  id: string;
}) => {
  const router = useRouter();

  return (
    <AlertDialog open={condition}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            الخبر غير موجود، يرجى التأكد من الرابط
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            لا يمكن العثور على الخبر {id} الذي تبحث عنه
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5 flex w-full items-center !justify-center gap-3">
          <AlertDialogAction
            className="bg-black text-white"
            onClick={() => router.back()}
          >
            العودة للخلف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewsNotFound;
