import * as React from "react";
import { Link } from "gatsby";
import { Column, Card, Title, Button } from "rbx";
import Img from "gatsby-image";

export interface Post {
  id: string;
  fields: {
    slug: string;
  };
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
}

const PostItem: React.FC<Props> = ({ post }) => {
  return (
    <Column size={12}>
      <Card key={post.id}>
        {/* <div className="card-image">
        <img src="{{ post.image }}" alt="{{ post.title }}">
    </div> */}
        {post.frontmatter.image ? (
          <Card.Image>
            <Img sizes={post.frontmatter.image.childImageSharp.sizes} />
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
          <div className="content">
            {post.frontmatter.image && (
              <Title as={Link} size={4} to={post.fields.slug}>
                {post.frontmatter.title}
              </Title>
            )}
            {/* {% if post.image %}
            <a className="title is-4" href="{{ site.baseurl }}{{ post.url }}">{{ post.title}}</a>
            {% endif %} */}
            <p>{post.frontmatter.description}</p>
          </div>
          <div className="has-text-centered">
            <Button color="primary" as={Link} to={post.fields.slug}>
              Read more
            </Button>
          </div>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
            Published: {post.frontmatter.date.toLocaleString("ja-JP")}
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
