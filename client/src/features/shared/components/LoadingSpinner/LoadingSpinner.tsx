import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className={`${styles.load} flex flex-row h-full items-center justify-center`}
    >
      <div className={`${styles.progress}`}></div>
      <div className={`${styles.progress} ${styles.progressSecond}`}></div>
      <div className={`${styles.progress} ${styles.progressThird}`}></div>
    </div>
  );
};

export default LoadingSpinner;
