import { useState } from "react";
import { useMutation } from "urql";

import { GET_USERS_QUERY } from "../../../graphql/user/queries/getUsers.query";
import { DELETE_USER_MUTATION } from "../../../graphql/user/mutations/deleteUserById.mutation";
import { DELETE_USERS_MUTATION } from "../../../graphql/user/mutations/deleteUsers.mutation";
import { usePersistentQuery } from "../../../shared/hooks/usePersistentQuery.hook";
import { STORAGE_KEYS } from "../../../shared/constants/storage.constants";
import type { GetUsersQuery } from "../../../graphql/codegen/generated/graphql";
import { useRouter } from "next/navigation";

export const useUserManager = () => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {
    data: users,
    isFirstLoad,
    error,
    reexecuteQuery,
  } = usePersistentQuery<GetUsersQuery, object, GetUsersQuery["users"]>(
    {
      query: GET_USERS_QUERY,
      requestPolicy: "cache-and-network",
    },
    STORAGE_KEYS.USERS_PREFIX + "all",
    (data) => data.users,
    []
  );

  const [, deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [, deleteUsers] = useMutation(DELETE_USERS_MUTATION);

  const handleSelectAll = () => {
    if (users && selectedIds.length === users.length) {
      setSelectedIds([]);
    } else if (users) {
      setSelectedIds(users.map((u) => u.id));
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
    router.push("/admin/user/create");
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/user/edit/${id}`);
  };

  const handleDeleteSelected = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} users?`
      )
    )
      return;

    const result = await deleteUsers({ ids: selectedIds });
    if (result.error) {
      alert("Error deleting users: " + result.error.message);
    } else {
      setSelectedIds([]);
      reexecuteQuery();
    }
  };

  const handleDelete = async (id: number, email: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${email}"?`))
      return;

    const result = await deleteUser({ id });
    if (result.error) {
      alert("Error deleting user: " + result.error.message);
    } else {
      reexecuteQuery();
    }
  };

  return {
    users,
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
