import PageContainer from "../../components/layout/PageContainer";
import FeatureCarousel from "../../components/features/FeatureCarousel";
import { featureCarousels } from "../../data/features";
import "./Features.css";

function Features() {
  return (
    <PageContainer className="features-page">
      <section className="page-heading">
        <span className="page-heading__eyebrow">FEATURES</span>
        <h1>
          Powerful tools for
          <br />
          smarter decisions.
        </h1>
        <p>
          Explore the capabilities that help your team understand
          performance and move faster.
        </p>
      </section>

      <section className="features-list">
        {featureCarousels.map((carousel) => (
          <FeatureCarousel key={carousel.id} carousel={carousel} />
        ))}
      </section>
    </PageContainer>
  );
}

export default Features;
