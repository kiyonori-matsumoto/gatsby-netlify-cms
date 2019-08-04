import * as React from "react";
import { Link } from "gatsby";

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
    <div className="card" key={post.id}>
      {/* <div className="card-image">
        <img src="{{ post.image }}" alt="{{ post.title }}">
    </div> */}
      <header className="card-header">
        <Link className="card-header-title" to={post.fields.slug}>
          {post.frontmatter.title}
        </Link>
      </header>
      {/* {% endif %} */}
      <div className="card-content">
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
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">Published: </p>
      </footer>
    </div>
  );
};

export default PostItem;

export const PostList: React.FC = ({ children }) => (
  <div className="column is-12">{children}</div>
);
