"use client";

import Button from "../../../shared/components/Button/Button";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import HeaderLeftDecor from "../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";
import { useBlogManager } from "@/shared/hooks/admin/useBlogManager";
import ArticleListItem from "./components/ArticleListItem/ArticleListItem";
import { useEffect, useState } from "react";

export default function BlogManager() {
  const {
    articles,
    isFirstLoad,
    error,
    selectedIds,
    handleSelectAll,
    handleToggleSelection,
    handleDeleteSelected,
    handleDelete,
    handleCreateNew,
    handleEdit,
  } = useBlogManager();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isFirstLoad) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpinner />{" "}
      </div>
    );
  }

  if (error && (!articles || articles.length === 0))
    return <div className="p-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="h-full w-full overflow-y-auto text-text-default">
      <div className="p-4 max-w-6xl mx-auto flex flex-col gap-4 pb-20">
        <div className="flex flex-row text-nowrap gap-4 justify-between items-center border-b border-border-default pb-6">
          <div className="flex  items-center gap-4 w-full">
            <HeaderLeftDecor className="text-2xl font-forum">
              ARTICLES ({articles.length})
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
                articles.length > 0 && selectedIds.length === articles.length
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

        {articles?.length === 0 && (
          <div className="text-center py-20 opacity-50 flex flex-col items-center">
            <p className="text-xl font-forum">No articles found.</p>
            <p className="text-sm font-satoshi mt-2 text-text-muted">
              Write your first blog post to see it here.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {articles?.map((article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              isSelected={selectedIds.includes(article.id)}
              onToggle={() => handleToggleSelection(article.id)}
              onDelete={() => handleDelete(article.id, article.name)}
              onEdit={() => handleEdit(article.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
