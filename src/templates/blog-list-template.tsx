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
    allMdx: {
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
    site: {
      siteMetadata: {
        title: string;
        siteUrl: string;
      };
    };
  };
  pageContext: {
    latestPosts: Post[];
  };
}

export default class IndexPage extends React.Component<Props> {
  render() {
    const { data, pageContext } = this.props;
    const { edges: posts, pageInfo } = data.allMdx;
    const { currentPage: current, pageCount } = pageInfo;
    const { latestPosts = [] } = pageContext || {};
    const { title, siteUrl } = data.site.siteMetadata;

    return (
      <Layout title="Blogs">
        <PageHelmet title={title} description="blog" url={siteUrl} />
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
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
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
            date(formatString: "YYYY年MM月DD日")
            description
            tags
            image {
              childImageSharp {
                sizes(maxWidth: 640) {
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
      pageInfo {
        perPage
        pageCount
        currentPage
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;
