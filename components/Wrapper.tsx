import React from "react";
import { cn } from "@/lib/utils";

function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex min-h-[inherit] w-full max-w-base flex-col items-start", //px-3 py-5 md:px-5 md:py-8 lg:px-10
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionWrapper({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "w-full px-10 py-verticalSpace md:px-horizontalSpace",
        className,
      )}
    >
      {children}
    </section>
  );
}

export { PageWrapper, SectionWrapper };
