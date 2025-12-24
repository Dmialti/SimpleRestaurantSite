import React, { forwardRef, type ReactNode } from "react";
import HeadingDecorated from "../HeadingDecorated/HeadingDecorated";
import styles from "./FormBaseLayout.module.css";
import { useBasePageLayoutAnimationContext } from "../../hooks/useBasePageLayoutAnimationContext";
import { useStaggeredReveal } from "../../hooks/useStaggeredReveal.hook";

interface FormBaseLayoutProps {
  header?: string;
  description?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  children?: ReactNode;
}

const BaseFormLayout = forwardRef<HTMLDivElement, FormBaseLayoutProps>(
  ({ header, description, onSubmit, className, children }, ref) => {
    const { isContentAnimationDone } = useBasePageLayoutAnimationContext();

    const {
      containerRef: staggeredHeaderContainerRef,
      addToRefs: staggeredHeaderAddToRefs,
    } = useStaggeredReveal({
      stagger: 0.1,
      y: -50,
      duration: 0.5,
      triggerByElement: true,
      enable: isContentAnimationDone,
    });

    return (
      <div
        ref={ref}
        className={`h-full min-w-0 px-24 py-20 flex flex-col items-center gap-20 rounded-2xl ${className}`}
      >
        <div
          ref={staggeredHeaderContainerRef}
          className="flex flex-col gap-4 text-text-default text-center"
        >
          {header && (
            <HeadingDecorated
              ref={staggeredHeaderAddToRefs}
              className={`font-forum text-[40px] leading-[120%] tracking-[1px] ${styles.headerSection} invisible`}
            >
              {header}
            </HeadingDecorated>
          )}
          {description && (
            <div
              ref={staggeredHeaderAddToRefs}
              className="font-satoshi text-[18px] leading-[150%] tracking-[0px] px-17 invisible"
            >
              {description}
            </div>
          )}
        </div>
        <form onSubmit={onSubmit} className={`flex flex-col gap-4 w-full`}>
          {children}
        </form>
      </div>
    );
  }
);

export default BaseFormLayout;
