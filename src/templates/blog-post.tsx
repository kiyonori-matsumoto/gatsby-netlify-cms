import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import PageHelmet from "../components/PageHelmet";
import Shares from "../components/Shares";
import GatsbyLink from "gatsby-link";
import {
  Tag,
  Column,
  Generic,
  Level,
  Heading,
  Box,
  Media,
  Image,
  Content
} from "rbx";
import LatestPosts from "../components/LatestPosts";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";

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
  tags,
  date
}) => {
  const PostContent = contentComponent || Content;
  return (
    <>
      <Content>
        <Generic as="p" textSize={7}>
          Published: {date}
        </Generic>
        <PostContent content={content} />
      </Content>

      <Heading>Tags</Heading>
      <Tag.Group>
        {tags.map(tag => (
          <Tag color="primary" key={tag} as={Link} to={`/tags/${tag}/`}>
            {tag}
          </Tag>
        ))}
      </Tag.Group>
    </>
  );
};

interface Post {
  id: string;
  body: any;
  fields: {
    slug: string;
  };
  frontmatter: {
    [key: string]: any;
  };
}

const NextPrev: React.FC<{ post: Post }> = ({ post, children }) => {
  const { thumbnail } = post.frontmatter;
  return (
    <Box>
      <Media>
        <Media.Item align="left">
          {thumbnail && (
            <Image.Container size={64}>
              <Image as={Img} fixed={thumbnail.childImageSharp.fixed} />
            </Image.Container>
          )}
        </Media.Item>
        <Media.Item>
          <GatsbyLink to={post.fields.slug}>
            <Heading>{children}</Heading>
            <p>{post.frontmatter.title}</p>
          </GatsbyLink>
        </Media.Item>
      </Media>
    </Box>
  );
};

const Renderer: React.FC<{ content: any }> = ({ content }) => (
  <MDXRenderer>{content}</MDXRenderer>
);

const BlogPost: React.FC<{
  data: {
    mdx: Post;
    previous: Post | null;
    next: Post | null;
    site: {
      siteMetadata: {
        title: string;
        siteUrl: string;
      };
    };
  };
  pageContext: any;
}> = ({ data, pageContext }) => {
  const { mdx: post, previous, next, site } = data;
  const { title, siteUrl } = site.siteMetadata;
  const url = `${siteUrl}${post.fields.slug}`;
  const { latestPosts = [] } = pageContext || {};
  const pageTitle = `${post.frontmatter.title} - ${title}`;

  return (
    <Layout
      title={post.frontmatter.title}
      image={
        post.frontmatter.image
          ? post.frontmatter.image.childImageSharp.sizes
          : undefined
      }
    >
      <PageHelmet
        title={pageTitle}
        description={post.frontmatter.description}
        url={url}
      />
      <Column.Group multiline>
        <Column desktop={{ size: 8 }} tablet={{ size: 12 }}>
          <BlogPostTemplate
            date={post.frontmatter.date}
            content={post.body}
            contentComponent={Renderer}
            description={post.frontmatter.description}
            tags={post.frontmatter.tags}
            title={post.frontmatter.title}
          />
          <Shares url={url} title={pageTitle} />
          <Heading>Others</Heading>
          <Level>
            <Level.Item align="left">
              {previous && <NextPrev post={previous}>previous</NextPrev>}
            </Level.Item>
            <Level.Item align="right">
              {next && <NextPrev post={next}>next</NextPrev>}
            </Level.Item>
          </Level>
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
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image {
          childImageSharp {
            sizes(maxWidth: 800) {
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

    previous: mdx(id: { eq: $previousId }) @include(if: $hasPrevious) {
      fields {
        slug
      }
      frontmatter {
        title
        thumbnail: image {
          childImageSharp {
            fixed(fit: COVER, width: 64, height: 64) {
              aspectRatio
              tracedSVG
              width
              srcWebp
              srcSetWebp
              srcSet
              src
              originalName
              height
              base64
            }
          }
        }
      }
    }

    next: mdx(id: { eq: $nextId }) @include(if: $hasNext) {
      fields {
        slug
      }
      frontmatter {
        title
        thumbnail: image {
          childImageSharp {
            fixed(fit: COVER, width: 64, height: 64) {
              aspectRatio
              tracedSVG
              width
              srcWebp
              srcSetWebp
              srcSet
              src
              originalName
              height
              base64
            }
          }
        }
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
