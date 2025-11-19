import React, { type ReactNode } from "react";

interface ButtonProps {
  type: "simple" | "border" | "submit";
  enabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  enabled = true,
  onClick,
  className,
  children,
}) => {
  let typeClass: string;

  switch (type) {
    case "simple":
      typeClass = `border-[#EFE7D2]/0 hover:border hover:border-border-default hover:bg-background-muted`;
      break;
    case "border":
      typeClass = `bg-background-muted border-border-default hover:border-border-hover hover:bg-background-hover`;
      break;

    case "submit":
      typeClass = `bg-background-primary border-border-default hover:border-border-hover hover:bg-background-primary-hover`;
      break;
    default:
      throw new Error(`${type}`);
      break;
  }
  return (
    <button
      disabled={!enabled}
      onClick={enabled && onClick ? () => onClick() : undefined}
      className={
        (enabled
          ? `${typeClass} border transition duration-500 box-border text-center cursor-pointer`
          : `border-border-default bg-background-muted border text-text-muted`) +
        ` rounded-lg ${className}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
