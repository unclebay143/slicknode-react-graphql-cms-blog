// Get the read time of the post
export const getReadTime = (text) => {
  const words = text.split(" ");
  const readTime = Math.ceil(words.length / 200);
  return readTime;
};
