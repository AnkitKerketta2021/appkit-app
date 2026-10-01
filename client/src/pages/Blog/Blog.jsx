import PageContainer from "../../components/layout/PageContainer";
import BlogSection from "../../components/blog/BlogSection";
import { blogs } from "../../data/blogs";
import "./Blog.css";

function Blog() {
  return (
    <PageContainer className="blog-page">
      <section className="page-heading">
        <span className="page-heading__eyebrow">BLOG</span>
        <h1>
          Ideas for
          <br />
          smarter teams.
        </h1>
        <p>
          Insights, strategies and practical ideas for using data to build
          better businesses.
        </p>
      </section>

      <section className="blog-list">
        {blogs.map((blog, index) => (
          <BlogSection key={blog.id} blog={blog} index={index} />
        ))}
      </section>
    </PageContainer>
  );
}

export default Blog;
