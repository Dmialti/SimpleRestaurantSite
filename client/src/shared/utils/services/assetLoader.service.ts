const images = import.meta.glob<{ default: string }>(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif,svg}",
  { eager: true }
);

export const imageRegistry: Record<string, string> = {};

Object.entries(images).forEach(([path, module]) => {
  const fileName = path.split("/").pop() || "";
  if (!imageRegistry[fileName]) {
    imageRegistry[fileName] = module.default;
  }
});
