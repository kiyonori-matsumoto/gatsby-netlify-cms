import * as React from "react";
import { Link } from "gatsby";
import {
  Column,
  Card,
  Title,
  Button,
  Content,
  Generic,
  Icon,
  Level
} from "rbx";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { LevelItem } from "rbx/components/level/level-item";

export interface Post {
  id: string;
  fields: {
    slug: string;
  };
  excerpt: string;
  frontmatter: {
    title: string;
    date: Date;
    description: string;
    body: string;
    tags: string[];
    image: any;
  };
}

interface Props {
  post: Post;
  size?: number;
}

const PostItem: React.FC<Props> = ({ post, size = 12 }) => {
  return (
    <Column size={size}>
      <Card key={post.id}>
        {post.frontmatter.image ? (
          <Card.Image>
            <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
          </Card.Image>
        ) : (
          <Card.Header>
            <Card.Header.Title
              as={Link}
              className="card-header-title"
              to={post.fields.slug}
            >
              {post.frontmatter.title}
            </Card.Header.Title>
          </Card.Header>
        )}
        <Card.Content>
          <Content>
            {post.frontmatter.image && (
              <Title as={Link} size={4} to={post.fields.slug}>
                {post.frontmatter.title}
              </Title>
            )}
            <p>{post.excerpt || post.frontmatter.description}</p>
          </Content>
          <Level breakpoint="mobile">
            <Level.Item align="left" />
            <Level.Item align="right" as="p" textSize={6} textColor="grey-dark">
              <Icon>
                <FontAwesomeIcon icon={faClock} />
              </Icon>{" "}
              {post.frontmatter.date}
            </Level.Item>
          </Level>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item as={Link} to={post.fields.slug}>
            Read more
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </Column>
  );
};

export default PostItem;

export const PostList: React.FC = ({ children }) => (
  <Column.Group multiline>{children}</Column.Group>
);
