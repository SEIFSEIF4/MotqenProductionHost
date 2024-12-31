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
  customAmount?: number;
  children: React.ReactNode;
}

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  isSinglePage?: boolean;
  customAmount?: number;
  [key: string]: any;
}

function SectionWrapper({
  id,
  className,
  children,
  isSinglePage = false,
  customAmount = 0.6,
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
      {children}
    </section>
  );
}

export { PageWrapper, SectionWrapper };
