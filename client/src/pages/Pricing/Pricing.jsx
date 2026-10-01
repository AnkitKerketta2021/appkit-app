import PageContainer from "../../components/layout/PageContainer";
import PricingCard from "../../components/pricing/PricingCard";
import { pricingPlans } from "../../data/pricing";
import "./Pricing.css";

function Pricing() {
  const handleDemo = (plan) => {
    window.alert(`Demo selected for ${plan.name}`);
  };

  const handleBuy = (plan) => {
    window.alert(`Buy selected for ${plan.name}`);
  };

  return (
    <PageContainer className="pricing-page">
      <section className="page-heading">
        <span className="page-heading__eyebrow">PRICING</span>
        <h1>
          Simple pricing.
          <br />
          Powerful analytics.
        </h1>
        <p>
          Choose the plan that fits your team today and scale whenever
          you are ready.
        </p>
      </section>

      <section className="pricing-grid">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            onDemo={handleDemo}
            onBuy={handleBuy}
          />
        ))}
      </section>
    </PageContainer>
  );
}

export default Pricing;
