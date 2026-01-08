import { forwardRef } from "react";

interface TileWithStarsProps {
  header: string;
  description: string[];
}

const TileWithStars = forwardRef<HTMLDivElement, TileWithStarsProps>(
  ({ header, description }, ref) => {
    return (
      <div
        ref={ref}
        className="flex flex-col items-center text-center min-w-0 w-full h-full p-8 gap-2.25 border border-border-default rounded-2xl text-text-default "
      >
        <div className="flex flex-row flex-wrap justify-center gap-1">
          {[...Array(5).keys()].map((key) => (
            <img
              key={key}
              className="h-4 w-4"
              src="/AboutPageMaterials/icons/starIcon.svg"
              alt="star icon"
            />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-forum text-[24px] leading-[120%] tracking-[1px]">
            {header}
          </div>
          <div className="font-satoshi text-[12px] leading-[190%] tracking-[1px]">
            {description.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default TileWithStars;
