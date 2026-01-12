"use client";

import {
  GetMenuQuery,
  GetMenuQueryVariables,
} from "@/graphql/codegen/generated/graphql";
import { GET_MENU_QUERY } from "@/graphql/menu/queries/getMenu.query";
import BasePageLayout from "@/shared/components/BasePageLayout/BasePageLayout";
import { useQueryReexecute } from "@/shared/hooks/useQueryReexecute";
import MenuList from "../MenuList/MenuList";
import styles from "./MenuContent.module.css";

import menuHero from "@/assets/MenuPageMaterials/menuHero.webp";
import { useRecalculateLayout } from "@/shared/hooks/useRecalculateLayout";
import ErrorFallback from "@/shared/components/ErrorFallback/ErrorFallback";

interface MenuContentProps {
  initialCategories: GetMenuQuery["getMenu"];
  initialError: string | null;
}

export default function MenuContent({
  initialCategories,
  initialError,
}: MenuContentProps) {
  const { data, error, isLoading, retry } = useQueryReexecute<
    GetMenuQuery,
    GetMenuQueryVariables
  >({
    initialData: { getMenu: initialCategories },
    initialError,
    query: GET_MENU_QUERY,
    variables: {},
  });

  const categories = data?.getMenu;
  const hasError = !!error;
  const hasCategories = categories && categories.length > 0;

  useRecalculateLayout(!isLoading && !!hasCategories);

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
      className={hasError ? styles.disableBorder : ""}
    >
      {hasError && !hasCategories ? (
        <ErrorFallback error={error} isLoading={isLoading} retry={retry} />
      ) : (
        <div
          className={`${
            styles.listContainer
          } h-fit rounded-2xl pt-8 pb-20 px-24 text-text-default transition-opacity duration-300 ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <MenuList categories={categories || []} />
        </div>
      )}
    </BasePageLayout>
  );
}
