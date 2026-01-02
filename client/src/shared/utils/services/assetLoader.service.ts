const media = import.meta.glob<{ default: string }>(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif,svg,mp4,webm,ogg}",
  { eager: true }
);

export const mediaRegistry: Record<string, string> = {};

Object.entries(media).forEach(([path, module]) => {
  const fileName = path.split("/").pop() || "";

  if (!mediaRegistry[fileName]) {
    mediaRegistry[fileName] = module.default;
  }
});
