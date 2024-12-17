import React from "react";

const PathwayHeader = ({ title }: { title: string }) => (
  <div className="my-6 flex items-center space-x-3 rtl:space-x-reverse">
    <span className="h-9 w-2 rounded-lg bg-slate-300" aria-hidden="true" />
    <h1 className={`text-3xl font-bold text-white`}>{title}</h1>
  </div>
);

export default PathwayHeader;
