import React, { forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, className = "", ...rest }, ref) => {
    return (
      <div className={`${className} w-full relative`}>
        {errorMessage && (
          <div className="absolute rounded-[10px] rounded-bl-none top-1 px-6 w-full text-red-600 text-[12px]">
            {errorMessage}
          </div>
        )}
        <input
          ref={ref}
          className={`${styles.input} w-full border-border-default border rounded-[10px] bg-background-muted py-4 px-6 font-satoshi text-text-muted text-[16px] leading-[180%] tracking-[0px] placeholder:text-text-muted outline-none transition duration-200 focus:border-border-hover focus:text-text-default`}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
