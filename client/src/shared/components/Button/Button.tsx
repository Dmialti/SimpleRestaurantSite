import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "simple" | "border" | "submit";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, children, className = "", disabled, ...rest }, ref) => {
    let variantClass = "";

    switch (variant) {
      case "simple":
        variantClass =
          "border-[#EFE7D2]/0 hover:border hover:border-border-default hover:bg-background-muted";
        break;
      case "border":
        variantClass =
          "bg-background-muted border-border-default hover:border-border-hover hover:bg-background-hover";
        break;
      case "submit":
        variantClass =
          "bg-background-primary border-border-default hover:border-border-hover hover:bg-background-primary-hover";
        break;
      default:
        variantClass = "bg-background-muted border-border-default";
        break;
    }

    const baseStyles =
      "border transition-colors duration-500 box-border text-center rounded-lg";

    const activeStyles = `${variantClass} cursor-pointer`;
    const disabledStyles =
      "border-border-default bg-background-muted text-text-muted cursor-not-allowed opacity-50";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
        ${baseStyles} 
        ${disabled ? disabledStyles : activeStyles} 
        ${className}
      `}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
