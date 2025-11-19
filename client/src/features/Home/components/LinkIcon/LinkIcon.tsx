import React from "react";

interface LinkIconProps {
  className?: string;
  imageSrc: string;
  imageHeight?: number;
  imageWidth?: number;
}

const LinkIcon: React.FC<LinkIconProps> = ({
  className,
  imageSrc,
  imageHeight = 1,
  imageWidth = 1,
}) => {
  return (
    <a
      href="/"
      className={`border-border-default hover:bg-background-muted p-2.5 border rounded-full transition duration-500 box-border ${className}`}
    >
      <img
        src={imageSrc}
        style={{
          height: `${imageHeight}rem`,
          width: `${imageWidth}rem`,
        }}
      />
    </a>
  );
};

export default LinkIcon;
