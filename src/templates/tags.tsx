import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostItem, { PostList } from "../components/Post";
import styled from "styled-components";
import PageHelmet from "../components/PageHelmet";
import { Heading } from "rbx";

class TagRoute extends React.Component<any> {
  render() {
    const { allMarkdownRemark } = this.props.data;

    const posts = allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    const totalCount = allMarkdownRemark.totalCount;

    return (
      <Layout title={`"${tag}" 検索結果`}>
        <PageHelmet
          title={`“${tag}” 検索結果`}
          description={`${tag} 検索結果`}
          url={`https://blog.matsukiyo.me/tags/${tag}`}
        />
        <p>
          <strong>{`“${tag}”`}</strong>
          タグがついた記事 (全 {totalCount}件)
        </p>
        <PostList>
          {posts.map(({ node: post }: any) => (
            <PostItem key={post.id} post={post} />
          ))}
        </PostList>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`;

const Header = styled.h1`
  font-weight: normal;
  margin-bottom: 2em;
`;

const TagName = styled.strong`
  margin-right: 4px;
`;
