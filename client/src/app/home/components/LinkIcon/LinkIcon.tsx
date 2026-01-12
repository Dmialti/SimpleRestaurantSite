import Image, { ImageProps, StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type LinkIconProps = ImageProps & {
  imageHeight?: number;
  imageWidth?: number;
  href: string;
};

export default function LinkIcon({
  className,
  imageHeight = 1,
  imageWidth = 1,
  href,
  ...rest
}: LinkIconProps) {
  return (
    <Link
      href={href}
      className={`border-border-default hover:bg-background-muted p-2.5 border rounded-full transition duration-500 box-border ${className}`}
    >
      <Image
        style={{
          height: `${imageHeight}rem`,
          width: `${imageWidth}rem`,
        }}
        height={imageHeight}
        width={imageWidth}
        {...rest}
      />
    </Link>
  );
}
