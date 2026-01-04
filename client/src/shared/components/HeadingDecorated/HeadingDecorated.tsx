import { forwardRef, type ReactNode } from "react";

interface HeadingDecoratedProps {
  className?: string;
  children?: ReactNode;
}

const HeadingDecorated = forwardRef<HTMLDivElement, HeadingDecoratedProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-row justify-center items-center text-center gap-4 ${className}`}
      >
        <div>
          <img
            alt="heading decoration icon"
            src="/shared/HeadingDecoratedMaterials/leftSymbol.svg"
          />
        </div>
        <div>{children}</div>
        <div>
          <img
            alt="heading decoration icon"
            src="/shared/HeadingDecoratedMaterials/rightSymbol.svg"
          />
        </div>
      </div>
    );
  }
);

export default HeadingDecorated;
