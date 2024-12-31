import { cn } from "@/lib/utils";

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

function PageWrapper({ children, className, ...props }: PageWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto flex min-h-[inherit] w-full max-w-base flex-col items-start overflow-hidden",
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
  className?: string;
  isSinglePage?: boolean;
  children: React.ReactNode;
}

interface SectionWrapperProps {
  id: string;
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
        "w-full overflow-hidden px-10 py-verticalSpace md:px-horizontalSpace",
        className,
        isSinglePage && "min-h-[inherit]",
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export { PageWrapper, SectionWrapper };
