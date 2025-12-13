import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";

import Button from "../../../shared/components/Button/Button";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import HeaderLeftDecor from "../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";

import { usePersistentQuery } from "../../../shared/hooks/useData.hook";
import { STORAGE_KEYS } from "../../../shared/constants/storage.constants";

import { DELETE_USER_MUTATION } from "../../../graphql/user/mutations/deleteUserById.mutation";
import { DELETE_USERS_MUTATION } from "../../../graphql/user/mutations/deleteUsers.mutation";
import { GET_USERS_QUERY } from "../../../graphql/user/queries/getUsers.query";
import type { GetUsersQuery } from "../../../graphql/codegen/generated/graphql";

const UserManager: React.FC = () => {
  const navigate = useNavigate();
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

  const handleDelete = async (id: number, email: string) => {
    if (window.confirm(`Are you sure you want to delete user "${email}"?`)) {
      const result = await deleteUser({ id });
      if (result.error) {
        alert("Error deleting user: " + result.error.message);
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
    if (users && selectedIds.length === users.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users?.map((u) => u.id) || []);
    }
  };

  const handleDeleteSelected = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.length} users?`
      )
    ) {
      const result = await deleteUsers({ ids: selectedIds });
      if (result.error) {
        alert("Error deleting users: " + result.error.message);
      } else {
        setSelectedIds([]);
        reexecuteQuery();
      }
    }
  };

  if (isFirstLoad) return <LoadingSpinner className="h-screen" />;
  if (error && (!users || users.length === 0))
    return <div className="p-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="h-full w-full overflow-y-auto text-text-default">
      <div className="p-4 max-w-6xl mx-auto flex flex-col gap-4 pb-20">
        <div className="flex flex-row text-nowrap gap-4 justify-between items-center border-b border-border-default pb-6">
          <div className="flex items-center gap-4 w-full">
            <HeaderLeftDecor className="text-2xl font-forum">
              USERS ({users?.length || 0})
            </HeaderLeftDecor>
          </div>
          <Button
            variant="border"
            className="px-6 py-2 w-full"
            onClick={() => navigate("/admin/users/create")}
          >
            + NEW USER
          </Button>
        </div>

        <div className="flex text-nowrap justify-between items-center gap-4 px-4 py-2 bg-white/5 rounded-lg">
          <div className="flex flex-row gap-4 items-center">
            <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer accent-primary-default"
              checked={
                users && users.length > 0 && selectedIds.length === users.length
              }
              onChange={handleSelectAll}
            />
            <span
              className="text-sm font-satoshi text-text-muted cursor-pointer"
              onClick={handleSelectAll}
            >
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

        {users?.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl font-forum">No users found.</p>
            <p className="text-sm font-satoshi mt-2">
              Create your first user to see them here.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-6">
          {users?.map((user) => (
            <div
              key={user.id}
              className={`flex flex-col border border-border-default/50 rounded-lg p-4 transition-all ${
                selectedIds.includes(user.id)
                  ? "border-primary-default ring-1 ring-primary-default bg-background-default"
                  : ""
              }`}
            >
              <div className="relative flex flex-row overflow-hidden items-center">
                <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-white/10 relative shrink-0 flex items-center justify-center border border-border-default">
                  <span className="font-forum text-2xl text-primary-default">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1 gap-2">
                  <div className="flex justify-between items-center gap-2">
                    <HeaderLeftDecor className="text-xl font-forum leading-tight">
                      {user.email}
                    </HeaderLeftDecor>

                    <div className="bg-primary-default/10 border border-primary-default/30 px-3 py-1 rounded-full">
                      <span className="font-satoshi text-xs font-bold text-primary-default uppercase tracking-wider">
                        {user.role || "USER"}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-text-muted font-satoshi">
                    ID: #{user.id}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-4 flex gap-3 border-t border-border-default/30 items-center">
                <Button
                  variant="border"
                  className="flex-1 py-2 text-sm"
                  onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                >
                  EDIT
                </Button>

                <input
                  type="checkbox"
                  className="w-6 h-6 accent-primary-default cursor-pointer bg-transparent border-border-default rounded focus:ring-primary-default shrink-0"
                  checked={selectedIds.includes(user.id)}
                  onChange={() => handleToggleSelection(user.id)}
                />

                <Button
                  variant="border"
                  className="py-2 px-4 text-sm text-red-400 border-red-900/30 hover:bg-red-900/10 hover:border-red-500/50"
                  onClick={() => handleDelete(user.id, user.email)}
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

export default UserManager;
