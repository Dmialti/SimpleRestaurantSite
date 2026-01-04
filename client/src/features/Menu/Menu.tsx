import React from "react";
import styles from "./Menu.module.css";
import { GET_MENU_QUERY } from "../../graphql/menu/queries/getMenu.query";
import type { GetMenuQuery } from "../../graphql/codegen/generated/graphql";
import BasePageLayout from "../../shared/components/BasePageLayout/BasePageLayout";
import Button from "../../shared/components/Button/Button";
import HeadingDecorated from "../../shared/components/HeadingDecorated/HeadingDecorated";
import LoadingSpinner from "../../shared/components/LoadingSpinner/LoadingSpinner";
import { STORAGE_KEYS } from "../../shared/constants/storage.constants";
import { usePersistentQuery } from "../../shared/hooks/usePersistentQuery.hook";
import MenuList from "./components/MenuList/MenuList";
import { SEO } from "../../shared/components/SEO/SEO";
import seoImage from "././../../assets/MenuPageMaterials/menuHero.avif";

const Menu: React.FC = () => {
  const {
    data: categories,
    error,
    fetching,
    isFirstLoad,
    reexecuteQuery,
  } = usePersistentQuery<GetMenuQuery, object, GetMenuQuery["getMenu"]>(
    { query: GET_MENU_QUERY },
    STORAGE_KEYS.MENU_DATA,
    (data) => data.getMenu,
    []
  );

  return (
    <>
      <SEO
        title="Our Menu"
        description="Authentic Japanese flavors: from fresh Nigiri to signature rolls. View our full menu."
        image={seoImage}
      />
      <BasePageLayout
        isScreenHeight={false}
        heading={["MENU"]}
        mediaType="image"
        mediaSrc="menuHero.png"
        className={fetching ? styles.disableBorder : ""}
      >
        {isFirstLoad ? (
          <LoadingSpinner />
        ) : error && (!categories || categories.length === 0) ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20 h-full text-center">
            <HeadingDecorated className="text-red-500 font-forum text-2xl tracking-widest">
              OOPS! SOMETHING WENT WRONG
            </HeadingDecorated>

            <p className="text-text-muted font-satoshi text-lg max-w-md">
              {error.message}
            </p>

            <Button
              variant="border"
              className="px-6 py-2 uppercase tracking-widest text-sm text-text-default"
              onClick={() => reexecuteQuery({ requestPolicy: "network-only" })}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div
            className={`${styles.listContainer} h-fit rounded-2xl pt-8 pb-20 px-24 text-text-default`}
          >
            <MenuList categories={categories!} />
          </div>
        )}
      </BasePageLayout>
    </>
  );
};

export default Menu;
