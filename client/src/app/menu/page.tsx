import { GetMenuQuery } from "@/graphql/codegen/generated/graphql";
import { GET_MENU_QUERY } from "@/graphql/menu/queries/getMenu.query";
import { fetchGraphQL } from "@/shared/api/fetch-graphql";
import MenuContent from "./components/MenuContent/MenuContent";

export default async function Menu() {
  let categories: GetMenuQuery["getMenu"] = [];
  let error = null;

  try {
    const data = await fetchGraphQL<GetMenuQuery>(GET_MENU_QUERY, {}, [
      "menu-data",
    ]);
    categories = data.getMenu || [];
  } catch (err: any) {
    error = err.message;
  }

  return <MenuContent initialCategories={categories} initialError={error} />;
}
