import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostItem, { PostList } from "../components/Post";
import styled from "styled-components";
import PageHelmet from "../components/PageHelmet";
import { Heading } from "rbx";

class TagRoute extends React.Component<any> {
  render() {
    const { allMdx } = this.props.data;

    const posts = allMdx.edges;
    const tag = this.props.pageContext.tag;
    const totalCount = allMdx.totalCount;

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
            <PostItem key={post.id} post={post} size={6} />
          ))}
        </PostList>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allMdx(
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
            title
            templateKey
            date(formatString: "YYYY年MM月DD日")
            description
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 640) {
                  aspectRatio
                  base64
                  originalImg
                  presentationHeight
                  originalName
                  presentationWidth
                  sizes
                  src
                  srcSet
                  srcSetWebp
                  srcWebp
                  tracedSVG
                }
              }
            }
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
