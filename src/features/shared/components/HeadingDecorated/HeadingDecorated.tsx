import React, { type ReactNode } from "react";

interface HeadingDecoratedProps {
  className?: string;
  children?: ReactNode;
}

const HeadingDecorated: React.FC<HeadingDecoratedProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`flex flex-row justify-center items-center text-center gap-4 ${className}`}
    >
      <div>
        <img src="/MenuPageMaterials/leftSymbol.svg" />
      </div>
      <div>{children}</div>
      <div>
        <img src="/MenuPageMaterials/rightSymbol.svg" />
      </div>
    </div>
  );
};

export default HeadingDecorated;
