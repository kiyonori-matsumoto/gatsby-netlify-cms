import React from "react";
import PostItem, { Post } from "./Post";
import { Title, Column } from "rbx";

const _LatestPosts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Title as="h4" size={5}>
        最新の投稿
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
