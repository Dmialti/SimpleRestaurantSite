import React from "react";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div
      className={`${styles.load} flex flex-row h-full items-center justify-center ${className}`}
    >
      <div className={`${styles.progress}`}></div>
      <div className={`${styles.progress} ${styles.progressSecond}`}></div>
      <div className={`${styles.progress} ${styles.progressThird}`}></div>
    </div>
  );
};

export default LoadingSpinner;
