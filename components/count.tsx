"use client";

import React from "react";
import CountUp, { useCountUp } from "react-countup";

export default function Count({
  number,
  className,
}: {
  number: number;
  className?: string;
}) {
  useCountUp({ ref: "counter", end: 10, duration: 2 });
  const [loading, setLoading] = React.useState<boolean>(false);

  const onStart = () => {
    setLoading(true);
  };

  const onEnd = () => {
    setLoading(false);
  };

  const containerProps = {
    "aria-busy": loading,
  };

  return (
    <div className="flex items-center gap-1">
      <span aria-hidden className={className}>
        +
      </span>
      <CountUp
        end={number}
        duration={3}
        scrollSpyOnce
        enableScrollSpy
        onEnd={onEnd}
        onStart={onStart}
        scrollSpyDelay={100}
        containerProps={containerProps}
        aria-busy={loading}
        className={className}
      />
    </div>
  );
}
