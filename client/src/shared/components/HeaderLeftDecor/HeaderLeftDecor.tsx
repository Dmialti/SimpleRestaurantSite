import React, { type ReactNode } from "react";

interface HeaderLeftDecorProps {
  className?: string;
  children?: ReactNode;
}

const HeaderLeftDecor: React.FC<HeaderLeftDecorProps> = ({
  className,
  children,
}) => {
  return (
    <div className={`flex flex-row justify-start gap-4 ${className}`}>
      <img
        className="shrink-0 h-auto w-auto object-contain"
        src="/BlogPageMaterials/date/decor.png"
      />
      <div>{children}</div>
    </div>
  );
};

export default HeaderLeftDecor;
