import { Link } from "react-router";
import PageContainer from "../../components/layout/PageContainer";
import "./Home.css";

function Home() {
  return (
    <PageContainer className="home-page">
      <section id="about" className="hero">
        <div className="hero__background-glow hero__background-glow--one" />
        <div className="hero__background-glow hero__background-glow--two" />

        <div className="hero__content">
          <span className="hero__eyebrow">
            BUSINESS INTELLIGENCE PLATFORM
          </span>

          <h1 className="hero__title">
            Take Control on Your
            <br />
            Statistic Page
          </h1>

          <p className="hero__description">
            Get real-time insights, track performance, and make smarter
            business decisions—all from one powerful dashboard.
          </p>

          <div className="hero__actions">
            <Link to="/features" className="hero__button">
              Create your Analysts
            </Link>

            <Link to="/pricing" className="hero__secondary-button">
              Explore Pricing
            </Link>
          </div>
        </div>

        <div className="hero__dashboard-preview">
          <div className="preview-card preview-card--one">
            <span>Revenue</span>
            <strong>$84.2K</strong>
            <small>+18.4%</small>
          </div>

          <div className="preview-card preview-card--two">
            <span>Active Users</span>
            <strong>24,892</strong>
            <small>+12.8%</small>
          </div>

          <div className="preview-chart">
            <div className="chart-line chart-line--one" />
            <div className="chart-line chart-line--two" />
            <div className="chart-line chart-line--three" />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Home;
