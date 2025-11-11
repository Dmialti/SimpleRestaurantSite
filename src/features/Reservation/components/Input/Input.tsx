import React, { type HTMLInputTypeAttribute } from "react";

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      type={props.type}
      className={`${props.className} border-border-default border rounded-[10px] bg-background-muted py-4 px-6 font-satoshi text-text-default text-[16px] leading-[180%] tracking-[0px] placeholder:text-text-muted outline-none transition duration-200 focus:border-border-hover`}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
