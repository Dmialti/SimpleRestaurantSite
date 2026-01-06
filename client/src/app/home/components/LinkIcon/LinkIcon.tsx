import React from "react";

type LinkIconProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  imageSrc: string;
  imageHeight?: number;
  imageWidth?: number;
  href: string;
};

const LinkIcon: React.FC<LinkIconProps> = ({
  className,
  imageSrc,
  imageHeight = 1,
  imageWidth = 1,
  href,
  ...rest
}) => {
  return (
    <a
      href={href}
      className={`border-border-default hover:bg-background-muted p-2.5 border rounded-full transition duration-500 box-border ${className}`}
    >
      <img
        src={imageSrc}
        style={{
          height: `${imageHeight}rem`,
          width: `${imageWidth}rem`,
        }}
        {...rest}
      />
    </a>
  );
};

export default LinkIcon;
