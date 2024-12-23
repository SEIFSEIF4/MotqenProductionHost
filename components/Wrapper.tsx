"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

function PageWrapper({ children, className, ...props }: PageWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto flex min-h-[inherit] w-full max-w-base flex-col items-start",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  isSinglePage?: boolean;
  className?: string;
  children: React.ReactNode;
}

function SectionWrapper({
  id,
  className,
  children,
  isSinglePage = false,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full px-10 py-verticalSpace md:px-horizontalSpace",
        className,
        isSinglePage && "min-h-[inherit]",
      )}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}

interface BodyClassWrapperProps {
  className: string;
  children: React.ReactNode;
}

function BodyClassWrapper({ className, children }: BodyClassWrapperProps) {
  React.useEffect(() => {
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);

  return <>{children}</>;
}

export { PageWrapper, SectionWrapper, BodyClassWrapper };
