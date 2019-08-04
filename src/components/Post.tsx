import * as React from "react";
import { Link } from "gatsby";
import { Column, Card } from "rbx";

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
        <Card.Header>
          <Card.Header.Title
            as={Link}
            className="card-header-title"
            to={post.fields.slug}
          >
            {post.frontmatter.title}
          </Card.Header.Title>
        </Card.Header>
        {/* {% endif %} */}
        <Card.Content>
          <div className="content">
            {/* {% if post.image %}
            <a className="title is-4" href="{{ site.baseurl }}{{ post.url }}">{{ post.title}}</a>
            {% endif %} */}
            <p>{post.frontmatter.description}</p>
          </div>
          <div className="has-text-centered">
            <Link to={post.fields.slug} className="button is-primary">
              Read more
            </Link>
          </div>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>Published: </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </Column>
  );
};

export default PostItem;

export const PostList: React.FC = ({ children }) => (
  <Column.Group multiline>{children}</Column.Group>
);
