import React from "react";

interface ParagraphProps {
  header?: string;
  children: ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  header,
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {header && (
        <div className="uppercase font-forum text-text-default text-[32px] leading-[100%] tracking-[0px]">
          {header}
        </div>
      )}
      <div className="font-satoshi text-text-muted text-[16px] leading-[180%] tracking-[0px]">
        {children}
      </div>
    </div>
  );
};

export default Paragraph;
