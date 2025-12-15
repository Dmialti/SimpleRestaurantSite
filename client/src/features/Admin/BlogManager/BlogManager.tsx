import React, { useState } from "react";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import { GET_ARTICLES_QUERY } from "../../../graphql/blog/queries/getArticles.query";
import Button from "../../../shared/components/Button/Button";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { DELETE_ARTICLE_MUTATION } from "../../../graphql/article/mutations/deleteArticle.mutation";
import { DELETE_ARTICLES_MUTATION } from "../../../graphql/article/mutations/deleteArticles.mutation";
import HeaderLeftDecor from "../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";
import { usePersistentQuery } from "../../../shared/hooks/usePersistentQuery.hook";
import type { GetArticlesQuery } from "../../../graphql/codegen/generated/graphql";
import { STORAGE_KEYS } from "../../../shared/constants/storage.constants";
import HeadingDecorated from "../../../shared/components/HeadingDecorated/HeadingDecorated";

const BlogManager: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {
    data: articles,
    isFirstLoad,
    error,
    reexecuteQuery,
  } = usePersistentQuery<
    GetArticlesQuery,
    object,
    GetArticlesQuery["articles"]
  >(
    { query: GET_ARTICLES_QUERY },
    STORAGE_KEYS.ARTICLES_DATA,
    (data) => data.articles,
    []
  );

  const [, deleteSingleArticle] = useMutation(DELETE_ARTICLE_MUTATION);
  const [, deleteManyArticles] = useMutation(DELETE_ARTICLES_MUTATION);

  const handleSelectAll = () => {
    if (selectedIds.length === articles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(articles.map((a) => a.id));
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} articles?`)) return;

    await deleteManyArticles({ ids: selectedIds });
    setSelectedIds([]);
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const handleDeleteSingle = async (id: number) => {
    if (!window.confirm("Delete this article?")) return;

    const result = await deleteSingleArticle({ id });

    if (result.error) {
      console.error("Mutation error:", result.error);

      const isAuthError = result.error.graphQLErrors.some(
        (item) =>
          item.message === "Token not found" ||
          item.message === "Token is incorrect or expired"
      );

      if (isAuthError) {
        alert("Session expired. Please log in again.");
        navigate("/admin/login");
      } else {
        alert(`Error: ${result.error.message}`);
      }
    }
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  if (isFirstLoad) return <LoadingSpinner />;
  if (error && (!articles || articles.length === 0)) {
    return (
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
    );
  }
  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col gap-4 text-text-default">
      <div className="flex flex-row text-nowrap gap-4 justify-between items-center border-b border-border-default pb-6">
        <div className="flex  items-center gap-4 w-full">
          <HeaderLeftDecor className="text-2xl font-forum">
            ARTICLES ({articles.length})
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

      <div className="flex flex-col gap-3">
        {articles.map((article) => (
          <div
            key={article.id}
            className={`flex flex-col border border-border-default/50 rounded-lg p-4 transition-all ${
              selectedIds.includes(article.id)
                ? "border-primary-default ring-1 ring-primary-default bg-background-default"
                : ""
            }`}
          >
            <div
              className={`
                relative flex flex-row overflow-hidden bg-background-default/50 
              `}
            >
              <div className="aspect-video w-[150px] h-[100px] rounded-2xl overflow-hidden bg-black/20 relative shrink-0">
                <img
                  src={article.imageSrc}
                  alt={article.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col flex-1 gap-4">
                <div className="flex justify-between items-start gap-2">
                  <HeaderLeftDecor className="text-xl font-forum leading-tight">
                    {article.name}
                  </HeaderLeftDecor>
                </div>

                <p className="text-sm text-text-muted line-clamp-2">
                  {article.description}
                </p>
              </div>
            </div>
            <div className="mt-auto pt-4 flex gap-3 border-t border-border-default/30 items-center">
              <Button
                variant="border"
                className="flex-1 py-2 text-sm"
                onClick={() => navigate(`/admin/blog/edit/${article.id}`)}
              >
                EDIT
              </Button>

              <input
                type="checkbox"
                className="w-6 h-6 accent-primary-default cursor-pointer bg-transparent border-border-default rounded focus:ring-primary-default shrink-0"
                checked={selectedIds.includes(article.id)}
                onChange={() => handleSelectOne(article.id)}
              />

              <Button
                variant="border"
                className="py-2 px-4 text-sm text-red-400 border-red-900/30 hover:bg-red-900/10 hover:border-red-500/50"
                onClick={() => handleDeleteSingle(article.id)}
              >
                🗑️
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
