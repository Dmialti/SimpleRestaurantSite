import Button from "@/shared/components/Button/Button";
import HeaderLeftDecor from "@/shared/components/HeaderLeftDecor/HeaderLeftDecor";

interface UserListItemProps {
  user: any;
  isSelected: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function UserListItem({
  user,
  isSelected,
  onToggle,
  onDelete,
  onEdit,
}: UserListItemProps) {
  return (
    <div
      key={user.id}
      className={`flex flex-col border border-border-default/50 rounded-lg p-4 transition-all ${
        isSelected
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

          <p className="text-sm text-text-muted font-satoshi">ID: #{user.id}</p>
        </div>
      </div>

      <div className="mt-auto pt-4 flex gap-3 border-t border-border-default/30 items-center">
        <Button
          variant="border"
          className="flex-1 py-2 text-sm"
          onClick={onEdit}
        >
          EDIT
        </Button>

        <input
          type="checkbox"
          className="w-6 h-6 accent-primary-default cursor-pointer bg-transparent border-border-default rounded focus:ring-primary-default shrink-0"
          checked={isSelected}
          onChange={onToggle}
        />

        <Button
          variant="border"
          className="py-2 px-4 text-sm text-red-400 border-red-900/30 hover:bg-red-900/10 hover:border-red-500/50"
          onClick={onDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
