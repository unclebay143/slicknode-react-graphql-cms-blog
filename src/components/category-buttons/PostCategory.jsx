import React, { useEffect } from "react";
import BlogService from "../../service/blog.service";
import styles from "./post-category.module.css";
export const PostCategory = ({ setPosts }) => {
  // categories state
  const [categories, setCategories] = React.useState(null);
  useEffect(() => {
    BlogService.fetchBlogCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);
  const handleCategoryClick = (category) => {
    BlogService.fetchBlogPosts().then((posts) => {
      if (category === "all") {
        return setPosts(posts);
      } else {
        const filteredPosts = posts.filter(({ node }) => {
          return node?.category?.name === category;
        });
        return setPosts(filteredPosts);
      }
    });
  };
  return (
    <div className={styles.categorybuttons}>
      <button
        className={styles.categorybutton}
        onClick={() => handleCategoryClick("all")}
      >
        {categories ? "View All" : "Loading..."}
      </button>
      {categories &&
        categories?.map(({ node }) => {
          const { id, name } = node;
          return (
            <button
              className={styles.categorybutton}
              key={id}
              onClick={() => handleCategoryClick(name)}
            >
              {name}
            </button>
          );
        })}
    </div>
  );
};
