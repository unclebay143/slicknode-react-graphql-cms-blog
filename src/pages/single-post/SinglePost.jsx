import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BlogService from "../../service/blog.service";
import { getReadTime } from "../../util/read-time";
import styles from "./single-post.module.css";
export const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    if (slug) {
      setLoading(true);
      BlogService.fetchSingleBlogPost(slug)
        .then((post) => {
          setPost(post);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [slug]);
  // Loading state UI
  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className={styles.post}>
        {post && (
          <>
            <div className={styles.wrapper}>
              <h1>{post.title}</h1>
              <section className={styles.postInfo}>
                <span className={styles.createdAt}>
                  Published Date:{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className={styles.divider}>﹒</span>
                <span className={styles.readTime}>
                  {getReadTime(post.text)} Min Read Time
                </span>
              </section>
              <img src={post.image.url} />
              {post.category && (
                <>
                  <span className={styles.categoryHeading}>Category:</span>{" "}
                  <span className={styles.categoryBtn}>
                    {post.category?.name.toUpperCase()}
                  </span>
                </>
              )}
              <p>{post.text}</p>
              <Link to='/'>
                <button className={styles.readmorebtn}>Read More</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};
