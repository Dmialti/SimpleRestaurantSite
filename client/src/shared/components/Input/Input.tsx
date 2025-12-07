import React, { type HTMLInputTypeAttribute } from "react";
import styles from "./Input.module.css";

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  errorMessage,
  className,
  ...rest
}) => {
  return (
    <div className={`${className} w-full relative`}>
      {errorMessage && (
        <div className="absolute rounded-[10px] rounded-bl-none top-1 px-6 w-full text-red-600 text-[12px]">
          {errorMessage}
        </div>
      )}
      <input
        type={type}
        className={`${styles.input} w-full border-border-default border rounded-[10px] bg-background-muted py-4 px-6 font-satoshi text-text-muted text-[16px] leading-[180%] tracking-[0px] placeholder:text-text-muted outline-none transition duration-200 focus:border-border-hover focus:text-text-default`}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
