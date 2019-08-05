import React from "react";
import PostItem, { Post } from "./Post";
import { Title, Column } from "rbx";

const _LatestPosts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Title as={"p"} size={4}>
        Latest Posts
      </Title>

      <Column.Group multiline>
        {posts.map(post => (
          <PostItem post={post} key={post.id} />
        ))}
      </Column.Group>
    </>
  );
};

export default _LatestPosts;
