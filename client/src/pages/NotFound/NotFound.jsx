import { Link } from "react-router";
import PageContainer from "../../components/layout/PageContainer";

function NotFound() {
  return (
    <PageContainer>
      <section className="page-heading">
        <span className="page-heading__eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            marginTop: "28px",
            padding: "14px 22px",
            borderRadius: "14px",
            color: "white",
            background: "var(--brand-gradient)",
            fontWeight: 700
          }}
        >
          Back Home
        </Link>
      </section>
    </PageContainer>
  );
}

export default NotFound;
