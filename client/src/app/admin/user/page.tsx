"use client";

import React, { useEffect, useState } from "react";
import Button from "../../../shared/components/Button/Button";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import HeaderLeftDecor from "../../../shared/components/HeaderLeftDecor/HeaderLeftDecor";
import { useUserManager } from "@/shared/hooks/admin/useUserManager";
import UserListItem from "./components/UserListItem/UserListItem";

export default function UserManager() {
  const {
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
  } = useUserManager();

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

  if (error && (!users || users.length === 0))
    return <div className="p-10 text-red-500">Error: {error.message}</div>;

  const allSelected =
    users && users.length > 0 && selectedIds.length === users.length;

  return (
    <div className="h-full w-full overflow-y-auto text-text-default">
      <div className="p-4 max-w-6xl mx-auto flex flex-col gap-4 pb-20">
        <div className="flex flex-row text-nowrap gap-4 justify-between items-center border-b border-border-default pb-6">
          <div className="flex items-center gap-4 w-full">
            <HeaderLeftDecor className="text-2xl font-forum uppercase">
              USERS ({users?.length || 0})
            </HeaderLeftDecor>
          </div>
          <Button
            variant="border"
            className="px-6 py-2 w-full md:w-auto"
            onClick={handleCreateNew}
          >
            + NEW USER
          </Button>
        </div>

        <div className="flex text-nowrap justify-between items-center gap-4 px-4 py-2 bg-white/5 rounded-lg">
          <div className="flex flex-row gap-4">
            <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer accent-primary-default"
              checked={allSelected}
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

        {users?.length === 0 && (
          <div className="text-center py-20 opacity-50 flex flex-col items-center">
            <p className="text-4xl mb-2">👥</p>
            <p className="text-xl font-forum">No users found.</p>
            <p className="text-sm font-satoshi mt-2 text-text-muted">
              Add your first user to see them here.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {users?.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              isSelected={selectedIds.includes(user.id)}
              onToggle={() => handleToggleSelection(user.id)}
              onDelete={() => handleDelete(user.id, user.email)}
              onEdit={() => handleEdit(user.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
