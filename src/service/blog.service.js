import { gql } from "@apollo/client";
import client from "./apollo-client";
const fetchBlogPosts = async () => {
  const { data } = await client.query({
    query: gql`
      {
        Blog_listArticle {
          edges {
            node {
              createdAt
              id
              image {
                url
              }
              publishedBy {
                firstName
                username
              }
              slug
              title
              text
              category {
                name
              }
            }
          }
        }
      }
    `,
  });
  return data.Blog_listArticle.edges;
};

const fetchBlogCategories = async () => {
  const { data } = await client.query({
    query: gql`
      {
        Blog_listCategory {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    `,
  });
  return data.Blog_listCategory.edges;
};

const fetchSingleBlogPost = async (slug) => {
  try {
    const { data } = await client.query({
      query: gql`
          {
            Blog_getArticleBySlug(slug: "${slug}") {
              id
              text
              title
              createdAt
              image {
                url
              }
              category {
                name
              }
            }
          }
        `,
    });
    return data.Blog_getArticleBySlug;
  } catch (error) {
    throw error;
  }
};

const BlogService = {
  fetchBlogPosts,
  fetchSingleBlogPost,
  fetchBlogCategories,
};
export default BlogService;
