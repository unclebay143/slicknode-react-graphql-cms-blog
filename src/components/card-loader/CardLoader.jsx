import React from "react";
import styles from "./card-loader.module.css";
export const CardLoader = ({ count }) => {
  // Array with dummy data
  const skeletons = Array.from({ length: count }, (_, i) => i);
  return (
    <div className={styles.gridLoader}>
      {skeletons.map((_, i) => (
        <div className={styles.cardLoader} key={i + "loader"}>
          <div className={styles.imageLoader}></div>
          <h2 className={styles.titleLoader}></h2>
          <p className={styles.textLoader}></p>
          <div className={styles.postdetailsLoader}>
            <span className={styles.publishedAtLoader}></span>
            <span className={styles.readTimeLoader}></span>
          </div>
        </div>
      ))}
    </div>
  );
};
