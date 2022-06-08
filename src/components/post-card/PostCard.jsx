import React from "react";
import { Link } from "react-router-dom";
import { getReadTime } from "../../util/read-time";
import styles from "./post-card.module.css";
export const PostCard = ({ slug, title, text, createdAt, imageUrl }) => {
  return (
    <Link to={`/posts/${slug}`}>
      <div className={styles.card}>
        <div>
          <img
            src={imageUrl}
            alt={title}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h2>
          {title?.charAt(0).toUpperCase() + title?.slice(1)}
          {/* &rarr; */}
        </h2>
        <p>{text.substring(0, 100)}</p>
        <div className={styles.postdetails}>
          <span>Published: {new Date(createdAt).toLocaleDateString()}</span>
          <span>👁 {getReadTime(text)} min</span>
        </div>
      </div>
    </Link>
  );
};
