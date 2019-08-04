import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostItem, { Post, PostList } from "../components/Post";
import PageHelmet from "../components/PageHelmet";
import GatsbyLink from "gatsby-link";
import { Content, Section } from "rbx";

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: Post;
      }>;
    };
  };
}

export default class IndexPage extends React.Component<Props> {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    const now = new Date();

    return (
      <Layout title="Blogs">
        <PageHelmet
          title="blog"
          description="blog"
          url="https://blog.matsukiyo.me/"
        />
        <Section>
          <PostList>
            {posts.map(({ node: post }) => (
              <PostItem key={post.id} post={post} />
            ))}
          </PostList>
        </Section>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            description
            tags
          }
        }
      }
    }
  }
`;
