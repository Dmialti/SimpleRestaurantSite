import { useState } from "react";
import { useMutation } from "urql";
import { GET_ARTICLES_QUERY } from "../../../graphql/blog/queries/getArticles.query";
import { DELETE_ARTICLE_MUTATION } from "../../../graphql/article/mutations/deleteArticle.mutation";
import { DELETE_ARTICLES_MUTATION } from "../../../graphql/article/mutations/deleteArticles.mutation";
import { usePersistentQuery } from "../../../shared/hooks/usePersistentQuery.hook";
import { STORAGE_KEYS } from "../../../shared/constants/storage.constants";
import type { GetArticlesQuery } from "../../../graphql/codegen/generated/graphql";
import { useRouter } from "next/navigation";

export const useBlogManager = () => {
  const router = useRouter();
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
    if (articles && selectedIds.length === articles.length) {
      setSelectedIds([]);
    } else if (articles) {
      setSelectedIds(articles.map((a) => a.id));
    }
  };

  const handleToggleSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleCreateNew = () => {
    router.push("/admin/blog/create");
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/blog/edit/${id}`);
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} articles?`)) return;

    await deleteManyArticles({ ids: selectedIds });
    setSelectedIds([]);
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Delete article "${name}"?`)) return;

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
        router.push("/admin/login");
      } else {
        alert(`Error: ${result.error.message}`);
      }
    }
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  return {
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
  };
};
