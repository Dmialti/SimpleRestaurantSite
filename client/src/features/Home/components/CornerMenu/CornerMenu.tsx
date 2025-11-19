import React, { type ReactNode } from "react";

interface CornerMenuProps {
  className?: string;
  children?: ReactNode;
}

const CornerMenu: React.FC<CornerMenuProps> = ({ className, children }) => {
  return (
    <div
      className={`${className} absolute bg-background-default bottom-0 right-0 rounded-tl-3xl flex flex-row justify-center align-middle items-center`}
    >
      <img
        src="/StartingPageMaterials/icons/roundedEdge.svg"
        className="absolute -left-6 bottom-0"
      />
      <img
        src="/StartingPageMaterials/icons/roundedEdge.svg"
        className="absolute right-0 -top-6"
      />
      {children}
    </div>
  );
};

export default CornerMenu;
