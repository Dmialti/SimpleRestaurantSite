import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";

import Button from "../../../shared/components/Button/Button";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import HeaderLeftDecor from "../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";

import { usePersistentQuery } from "../../../shared/hooks/useData.hook";
import { STORAGE_KEYS } from "../../../shared/constants/storage.constants";

import { DELETE_DISH_MUTATION } from "../../../graphql/dish/mutations/deleteDish.mutation";
import { DELETE_DISHES_MUTATION } from "../../../graphql/dish/mutations/deleteDishes.mutation";
import { GET_DISHES_QUERY } from "../../../graphql/dish/queries/getDishes.query";
import type { GetDishesQuery } from "../../../graphql/codegen/generated/graphql";

const MenuManager: React.FC = () => {
  const navigate = useNavigate();
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

  if (isFirstLoad) return <LoadingSpinner className="h-screen" />;
  if (error && (!dishes || dishes.length === 0))
    return <div className="p-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="h-full w-full overflow-y-auto text-text-default">
      <div className="p-4 max-w-6xl mx-auto flex flex-col gap-4 pb-20">
        <div className="flex flex-row text-nowrap gap-4 justify-between items-center border-b border-border-default pb-6">
          <div className="flex  items-center gap-4 w-full">
            <HeaderLeftDecor className="text-2xl font-forum">
              DISHES ({dishes.length})
            </HeaderLeftDecor>
          </div>
          <Button
            variant="border"
            className="px-6 py-2 w-full"
            onClick={() => navigate("/admin/blog/create")}
          >
            + NEW ARTICLE
          </Button>
        </div>

        <div className="flex text-nowrap justify-between items-center gap-4 px-4 py-2 bg-white/5 rounded-lg">
          <div className="flex flex-row gap-4">
            <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer accent-primary-default"
              checked={
                dishes.length > 0 && selectedIds.length === dishes.length
              }
              onChange={handleSelectAll}
            />
            <span className="text-sm font-satoshi text-text-muted">
              Select All
            </span>
          </div>
          <Button
            variant="border"
            className="px-6 py-2 w-auto text-xs text-red-400 border-red-900/30 hover:bg-red-900/10"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length > 0 ? false : true}
          >
            DELETE SELECTED ({selectedIds.length})
          </Button>
        </div>

        {dishes?.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl font-forum">No dishes found.</p>
            <p className="text-sm font-satoshi mt-2">
              Create your first dish to see it here.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {dishes?.map((dish) => (
            <div
              key={dish.id}
              className={`flex flex-col border border-border-default/50 rounded-lg p-4 transition-all ${
                selectedIds.includes(dish.id)
                  ? "border-primary-default ring-1 ring-primary-default bg-background-default"
                  : ""
              }`}
            >
              <div
                className={`
                relative flex flex-row overflow-hidden bg-background-default/50 
                ${!dish.available ? "opacity-60 grayscale" : ""}
              `}
              >
                <div className="aspect-video w-[150px] h-[100px] rounded-2xl overflow-hidden bg-black/20 relative shrink-0">
                  <img
                    src={dish.imageSrc}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs tracking-widest text-primary-default uppercase">
                    {dish.category.name}
                  </div>

                  {!dish.available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 font-forum text-xl tracking-widest text-white">
                      UNAVAILABLE
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="flex justify-between items-start gap-2">
                    <HeaderLeftDecor className="text-xl font-forum leading-tight">
                      {dish.name}
                    </HeaderLeftDecor>
                    <span className="font-satoshi font-bold text-lg text-primary-default whitespace-nowrap">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-sm text-text-muted line-clamp-2">
                    {dish.description}
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex gap-3 border-t border-border-default/30 items-center">
                <Button
                  variant="border"
                  className="flex-1 py-2 text-sm"
                  onClick={() => navigate(`/admin/dish/edit/${dish.id}`)}
                >
                  EDIT
                </Button>

                <input
                  type="checkbox"
                  className="w-6 h-6 accent-primary-default cursor-pointer bg-transparent border-border-default rounded focus:ring-primary-default shrink-0"
                  checked={selectedIds.includes(dish.id)}
                  onChange={() => handleToggleSelection(dish.id)}
                />

                <Button
                  variant="border"
                  className="py-2 px-4 text-sm text-red-400 border-red-900/30 hover:bg-red-900/10 hover:border-red-500/50"
                  onClick={() => handleDelete(dish.id, dish.name)}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuManager;
