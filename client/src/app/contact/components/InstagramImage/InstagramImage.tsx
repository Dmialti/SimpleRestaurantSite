import CardContextProvider from "@/context/CardContext/CardContextProvider";
import CardWithContextHover from "@/shared/components/Card/CardIsHoveredContext";
import IconCardFill from "../IconCardFill/IconCardFill";
import { ImageProps } from "next/image";

import styles from "./InstagramImage.module.css";

export default function InstagramImage(props: ImageProps) {
  return (
    <CardContextProvider>
      <CardWithContextHover
        className={`relative cursor-pointer ${styles.igImage}`}
        mediaType="image"
        imageProps={{ ...props }}
        isAnimated={true}
      >
        <IconCardFill
          alt="instagram link icon"
          src="shared/icons/instagramLogo.svg"
        />
      </CardWithContextHover>
    </CardContextProvider>
  );
}
