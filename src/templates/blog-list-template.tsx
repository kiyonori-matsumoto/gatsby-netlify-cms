import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import PostItem, { Post, PostList } from "../components/Post";
import PageHelmet from "../components/PageHelmet";
import Pagenation from "../components/Pagination";
import LatestPosts from "../components/LatestPosts";
import { Column } from "rbx";

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: Post;
      }>;
      pageInfo: {
        perPage: number;
        pageCount: number;
        // itemCount: number;
        // hasPreviousPage: boolean;
        // hasNextPage: boolean;
        currentPage: number;
      };
    };
  };
  pageContext: {
    latestPosts: Post[];
  };
}

const url = (page: number) => (page === 1 ? "/" : `/blogs/${page}`);

export default class IndexPage extends React.Component<Props> {
  render() {
    const { data, pageContext } = this.props;
    const { edges: posts, pageInfo } = data.allMarkdownRemark;
    const { currentPage: current, pageCount } = pageInfo;
    const { latestPosts = [] } = pageContext || {};

    return (
      <Layout title="Blogs">
        <PageHelmet
          title="blog"
          description="blog"
          url="https://blog.matsukiyo.me/"
        />
        <Column.Group multiline>
          <Column>
            <Pagenation current={current} pageCount={pageCount} />
            <PostList>
              {posts.map(({ node: post }) => (
                <PostItem key={post.id} post={post} />
              ))}
            </PostList>
            <Pagenation current={current} pageCount={pageCount} />
          </Column>
          <Column desktop={{ size: 4 }} tablet={{ size: 12 }}>
            <LatestPosts posts={latestPosts} />
          </Column>
        </Column.Group>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
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
      pageInfo {
        perPage
        pageCount
        currentPage
      }
    }
  }
`;
