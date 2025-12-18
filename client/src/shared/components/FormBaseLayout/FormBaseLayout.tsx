import React, { type ReactNode } from "react";
import HeadingDecorated from "../HeadingDecorated/HeadingDecorated";

interface FormBaseLayoutProps {
  header?: string;
  description?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  children?: ReactNode;
}

const BaseFormLayout: React.FC<FormBaseLayoutProps> = ({
  header,
  description,
  onSubmit,
  className,
  children,
}) => {
  return (
    <div
      className={`h-full min-w-0 px-24 py-20 flex flex-col items-center gap-20 rounded-2xl ${className}`}
    >
      <div className="flex flex-col gap-4 text-text-default text-center">
        {header && (
          <HeadingDecorated className="wrap-normal font-forum text-[40px] leading-[120%] tracking-[1px]">
            {header}
          </HeadingDecorated>
        )}
        {description && (
          <div className="font-satoshi text-[18px] leading-[150%] tracking-[0px] px-17">
            {description}
          </div>
        )}
      </div>
      <form onSubmit={onSubmit} className={`flex flex-col gap-4 w-full`}>
        {children}
      </form>
    </div>
  );
};

export default BaseFormLayout;
