import React, { useEffect, useId, useState } from "react";
import { CardLoader } from "../../components/card-loader/CardLoader";
import { PostCategory } from "../../components/category-buttons/PostCategory";
import { PostCard } from "../../components/post-card/PostCard";
import BlogService from "../../service/blog.service";
import styles from "./home.module.css";

export const Home = () => {
  const postCardId = useId();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    BlogService.fetchBlogPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <span>My Blog!</span>
          </h1>
          <p className={styles.description}>
            Bringing You Closer To Technical Contents
          </p>
          <PostCategory setPosts={setPosts} />
          {posts ? (
            <div className={styles.grid}>
              {posts?.map(({ node }) => {
                const { id, slug, title, text, createdAt, image } = node;
                return (
                  <PostCard
                    key={`${postCardId}-${id}`}
                    slug={slug}
                    title={title}
                    text={text}
                    createdAt={createdAt}
                    imageUrl={image.url}
                  />
                );
              })}
            </div>
          ) : (
            <CardLoader count={4} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
