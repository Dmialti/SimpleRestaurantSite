import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "urql";

import { usePersistentQuery } from "../../../shared/hooks/usePersistentQuery.hook";
import { STORAGE_KEYS } from "../../../shared/constants/storage.constants";

import { DELETE_DISH_MUTATION } from "../../../graphql/dish/mutations/deleteDish.mutation";
import { DELETE_DISHES_MUTATION } from "../../../graphql/dish/mutations/deleteDishes.mutation";
import { GET_DISHES_QUERY } from "../../../graphql/dish/queries/getDishes.query";
import type { GetDishesQuery } from "../../../graphql/codegen/generated/graphql";

export const useMenuManager = () => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {
    data: dishes,
    isFirstLoad,
    error,
    reexecuteQuery,
  } = usePersistentQuery<GetDishesQuery, object, GetDishesQuery["dishes"]>(
    {
      query: GET_DISHES_QUERY,
      requestPolicy: "cache-and-network",
    },
    STORAGE_KEYS.MENU_PREFIX + "all",
    (data) => data.dishes,
    []
  );

  const [, deleteDish] = useMutation(DELETE_DISH_MUTATION);
  const [, deleteDishes] = useMutation(DELETE_DISHES_MUTATION);

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const result = await deleteDish({ id });
      if (result.error) {
        alert("Error deleting dish: " + result.error.message);
      } else {
        reexecuteQuery();
      }
    }
  };

  const handleToggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (dishes && selectedIds.length === dishes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(dishes?.map((d) => d.id) || []);
    }
  };

  const handleDeleteSelected = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.length} dishes?`
      )
    ) {
      const result = await deleteDishes({ ids: selectedIds });
      if (result.error) {
        alert("Error deleting dishes: " + result.error.message);
      } else {
        setSelectedIds([]);
        reexecuteQuery();
      }
    }
  };

  const handleCreateNew = () => {
    router.push("/admin/menu/create");
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/menu/edit/${id}`);
  };

  return {
    dishes,
    loading: isFirstLoad,
    error,
    selectedIds,
    handleDelete,
    handleDeleteSelected,
    handleToggleSelection,
    handleSelectAll,
    handleCreateNew,
    handleEdit,
  };
};
