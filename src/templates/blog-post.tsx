import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import styled from "styled-components";
import PageHelmet from "../components/PageHelmet";
import GatsbyLink from "gatsby-link";
import { Section, Container, Tag, Column, Generic } from "rbx";
import { kebabCase } from "lodash";
import LatestPosts from "../components/LatestPosts";

interface Props {
  date?: string;
  content: any;
  contentComponent: any;
  description: string;
  title: string;
  tags: string[];
}

export const BlogPostTemplate: React.FC<Props> = ({
  content,
  contentComponent,
  description,
  tags,
  date,
  title
}) => {
  const PostContent = contentComponent || Content;
  return (
    <>
      <div className="content">
        <Generic as="p" textSize={7}>
          Published: {date} by Me
        </Generic>

        <PostContent content={content} />
      </div>

      <div className="tags">
        tags:
        {tags.map(tag => (
          <Tag
            color="primary"
            key={tag}
            as={Link}
            to={`/tags/${kebabCase(tag)}/`}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </>
  );
};

interface Post {
  id: string;
  html: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    [key: string]: any;
  };
}

const BlogPost: React.FC<{
  data: { markdownRemark: Post; previous: Post | null; next: Post | null };
}> = ({ data, pageContext }) => {
  const { markdownRemark: post, previous, next } = data;
  const url = `https://ahnheejong.name${post.fields.slug}`;
  const { latestPosts = [] } = pageContext || {};

  return (
    <Layout title={post.frontmatter.title}>
      <PageHelmet
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        url={url}
      />
      <Column.Group multiline>
        <Column>
          <BlogPostTemplate
            date={post.frontmatter.date}
            content={post.html}
            contentComponent={HTMLContent}
            description={post.frontmatter.description}
            tags={post.frontmatter.tags}
            title={post.frontmatter.title}
          />
          <AdjacentArticles>
            {[previous, next].map((adjacentArticle, i) =>
              adjacentArticle != null ? (
                <AdjacentArticle
                  key={adjacentArticle.fields.slug}
                  to={adjacentArticle.fields.slug}
                >
                  <AdjacentArticleLabel>
                    {i === 0 ? "前へ" : "次へ"}
                  </AdjacentArticleLabel>
                  <AdjacentArticleTitle>
                    {adjacentArticle.frontmatter.title}
                  </AdjacentArticleTitle>
                </AdjacentArticle>
              ) : null
            )}
          </AdjacentArticles>
        </Column>
        <Column desktop={{ size: 4 }} tablet={{ size: 12 }}>
          <LatestPosts posts={latestPosts} />
        </Column>
      </Column.Group>
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID(
    $id: String!
    $previousId: String
    $hasPrevious: Boolean!
    $nextId: String
    $hasNext: Boolean!
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      html
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

    previous: markdownRemark(id: { eq: $previousId })
      @include(if: $hasPrevious) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }

    next: markdownRemark(id: { eq: $nextId }) @include(if: $hasNext) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

const AdjacentArticles = styled.div`
  display: flex;
  margin-bottom: 40px;

  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

const AdjacentArticle = styled(GatsbyLink)`
  flex: 1 1 50%;

  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #eaebec;

  text-decoration: none;

  &:first-child {
    margin-right: 8px;
  }

  &:last-child {
    margin-left: 8px;
    text-align: right;
  }

  &:first-child:last-child {
    margin: 0;
  }

  @media screen and (max-width: 800px) {
    flex-basis: 100%;
    margin: 6px 0;
  }
`;

const AdjacentArticleLabel = styled.div`
  font-size: 0.825em;
  margin-bottom: 8px;
`;

const AdjacentArticleTitle = styled.strong``;
