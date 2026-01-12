"use client";

import Button from "../Button/Button";
import HeadingDecorated from "../HeadingDecorated/HeadingDecorated";

interface ErrorFallbackProps {
  error?: string;
  isLoading?: boolean;
  retry?: () => void;
}

export default function ErrorFallback({
  error,
  isLoading,
  retry,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 h-full text-center">
      <HeadingDecorated className="text-red-500 font-forum text-2xl tracking-widest">
        OOPS! SOMETHING WENT WRONG
      </HeadingDecorated>

      <p className="text-text-muted font-satoshi text-lg max-w-md">
        Try again later: {error}
      </p>

      <Button
        variant="border"
        className={`px-6 py-2 uppercase tracking-widest text-sm text-text-default transition-opacity ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={retry}
      >
        {isLoading ? "RELOADING..." : "TRY AGAIN"}
      </Button>
    </div>
  );
}
