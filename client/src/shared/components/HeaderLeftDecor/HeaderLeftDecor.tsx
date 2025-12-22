import React, { type ReactNode } from "react";
import styles from "./HeaderLeftDecor.module.css";

interface HeaderLeftDecorProps {
  className?: string;
  children?: ReactNode;
}

const HeaderLeftDecor: React.FC<HeaderLeftDecorProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`flex flex-row justify-start gap-4 ${className} ${styles.flexBox}`}
    >
      <img
        className="shrink-[100] min-w-0 whitespace-nowrap h-auto w-auto object-contain"
        src="/BlogPageMaterials/date/decor.png"
      />
      <div className="shrink-1">{children}</div>
    </div>
  );
};

export default HeaderLeftDecor;
