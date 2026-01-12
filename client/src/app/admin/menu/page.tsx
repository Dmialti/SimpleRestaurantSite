"use client";

import { useEffect, useState } from "react";
import Button from "../../../shared/components/Button/Button";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import HeaderLeftDecor from "../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";
import { useMenuManager } from "@/shared/hooks/admin/useMenuManager";
import DishCard from "./components/DishCard/DishCard";

export default function MenuManager() {
  const {
    dishes,
    error,
    loading,
    selectedIds,
    handleDelete,
    handleDeleteSelected,
    handleToggleSelection,
    handleSelectAll,
    handleCreateNew,
    handleEdit,
  } = useMenuManager();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && (!dishes || dishes.length === 0))
    return <div className="p-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="h-full w-full overflow-y-auto text-text-default">
      <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4 pb-20">
        <div className="flex flex-row text-nowrap gap-4 justify-between items-center border-b border-border-default pb-6">
          <div className="flex  items-center gap-4 w-full">
            <HeaderLeftDecor className="text-2xl font-forum">
              DISHES ({dishes?.length || 0})
            </HeaderLeftDecor>
          </div>
          <Button
            variant="border"
            className="px-6 py-2 w-full"
            onClick={handleCreateNew}
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
                (dishes?.length || 0) > 0 &&
                selectedIds.length === dishes.length
              }
              onChange={handleSelectAll}
              disabled={!dishes || dishes.length === 0}
            />
            <span className="text-sm font-satoshi text-text-muted">
              Select All
            </span>
          </div>
          <Button
            variant="border"
            className="px-6 py-2 w-auto text-xs text-red-400 border-red-900/30 hover:bg-red-900/10"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
          >
            DELETE SELECTED ({selectedIds.length})
          </Button>
        </div>

        {(!dishes || dishes.length === 0) && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl font-forum">No dishes found.</p>
            <p className="text-sm font-satoshi mt-2">
              Create your first dish to see it here.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {dishes?.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              isSelected={selectedIds.includes(dish.id)}
              onToggle={() => handleToggleSelection(dish.id)}
              onDelete={() => handleDelete(dish.id, dish.name)}
              onEdit={() => handleEdit(dish.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
