export const waitForAssets = (container: HTMLElement): Promise<void> => {
  const images = Array.from(container.querySelectorAll("img[data-preload]"));

  const videos = Array.from(container.querySelectorAll("video[data-preload]"));

  if (images.length === 0 && videos.length === 0) {
    return Promise.resolve();
  }

  const imagePromises = images.map((img) => {
    const imageElement = img as HTMLImageElement;

    if (imageElement.complete && imageElement.naturalHeight !== 0) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      imageElement.onload = () => resolve();
      imageElement.onerror = () => resolve();
    });
  });

  const videoPromises = videos.map((vid) => {
    const videoElement = vid as HTMLVideoElement;

    if (videoElement.readyState >= 3) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      const finish = () => {
        videoElement.removeEventListener("canplaythrough", finish);
        videoElement.removeEventListener("error", finish);
        resolve();
      };

      videoElement.addEventListener("canplaythrough", finish);
      videoElement.addEventListener("error", finish);

      videoElement.load();
    });
  });

  return Promise.all([...imagePromises, ...videoPromises]).then(() => {});
};
