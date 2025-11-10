import React, { type ReactNode } from "react";

interface LinkProps {
  toggleBorder?: boolean;
  className?: string;
  children: ReactNode;
}

const Link: React.FC<LinkProps> = ({
  toggleBorder = false,
  className,
  children,
}) => {
  return (
    <a
      href="/"
      className={
        (toggleBorder
          ? `bg-background-muted border-border-default hover:border-border-hover hover:bg-background-hover`
          : `border-[#EFE7D2]/0 hover:border hover:border-border-default hover:bg-background-muted`) +
        ` p-3 border rounded-lg transition duration-500 box-border text-center ${className}`
      }
    >
      {children}
    </a>
  );
};

export default Link;
