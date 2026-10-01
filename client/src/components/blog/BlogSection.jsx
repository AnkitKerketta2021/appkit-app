import { Link } from "react-router";
import "./BlogSection.css";

function BlogSection({ blog, index }) {
  const isImageLeft = index % 2 === 0;

  return (
    <article
      className={`blog-row ${
        isImageLeft ? "blog-row--image-left" : "blog-row--image-right"
      }`}
    >
      <div className="blog-row__image-wrapper">
        <img src={blog.image} alt={blog.title} className="blog-row__image" />
      </div>

      <div className="blog-row__content">
        <span className="blog-row__category">{blog.category}</span>
        <span className="blog-row__date">{blog.date}</span>
        <h2 className="blog-row__title">{blog.title}</h2>
        <p className="blog-row__description">{blog.description}</p>
        <Link to={`/blog/${blog.id}`} className="blog-row__link">
          Read article →
        </Link>
      </div>
    </article>
  );
}

export default BlogSection;
