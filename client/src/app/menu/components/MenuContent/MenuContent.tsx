import { GetMenuQuery } from "@/graphql/codegen/generated/graphql";
import BasePageLayout from "@/shared/components/BasePageLayout/BasePageLayout";
import Button from "@/shared/components/Button/Button";
import HeadingDecorated from "@/shared/components/HeadingDecorated/HeadingDecorated";
import MenuList from "../MenuList/MenuList";
import styles from "./MenuContent.module.css";

import menuHero from "@/assets/MenuPageMaterials/menuHero.webp";

interface MenuContentProps {
  initialCategories: GetMenuQuery["getMenu"];
  initialError: string | null;
}

export default function MenuContent({
  initialCategories,
  initialError,
}: MenuContentProps) {
  return (
    <BasePageLayout
      isScreenHeight={false}
      heroCardProps={{
        heading: ["MENU"],
        mediaType: "image",
        imageProps: {
          src: menuHero,
          alt: "hero image",
        },
      }}
      className={initialError ? styles.disableBorder : ""}
    >
      {initialError &&
      (!initialCategories || initialCategories.length === 0) ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20 h-full text-center">
          <HeadingDecorated className="text-red-500 font-forum text-2xl tracking-widest">
            OOPS! SOMETHING WENT WRONG
          </HeadingDecorated>

          <p className="text-text-muted font-satoshi text-lg max-w-md">
            {initialError}
          </p>

          <Button
            variant="border"
            className="px-6 py-2 uppercase tracking-widest text-sm text-text-default"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <div
          className={`${styles.listContainer} h-fit rounded-2xl pt-8 pb-20 px-24 text-text-default`}
        >
          <MenuList categories={initialCategories!} />
        </div>
      )}
    </BasePageLayout>
  );
}
