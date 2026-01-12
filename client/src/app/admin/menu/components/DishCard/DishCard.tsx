import Button from "@/shared/components/Button/Button";
import HeaderLeftDecor from "@/shared/components/HeaderLeftDecor/HeaderLeftDecor";

interface DishCardProps {
  dish: any;
  isSelected: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function DishCard({
  dish,
  isSelected,
  onToggle,
  onDelete,
  onEdit,
}: DishCardProps) {
  return (
    <div
      key={dish.id}
      className={`flex flex-col border border-border-default/50 rounded-lg p-4 transition-all ${
        isSelected
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
            width="20"
            height="20"
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
