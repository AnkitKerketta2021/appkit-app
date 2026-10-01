import "./PricingCard.css";

function PricingCard({ plan, onDemo, onBuy }) {
  return (
    <article className={`pricing-card ${plan.popular ? "pricing-card--popular" : ""}`}>
      {plan.popular && (
        <span className="pricing-card__popular">Most Popular</span>
      )}

      <div className="pricing-card__image-wrapper">
        <img src={plan.image} alt={plan.name} className="pricing-card__image" />
      </div>

      <div className="pricing-card__content">
        <span className="pricing-card__name">{plan.name}</span>

        <div className="pricing-card__price">
          <strong>{plan.price}</strong>
          <span>{plan.period}</span>
        </div>

        <p className="pricing-card__description">{plan.description}</p>

        <ul className="pricing-card__features">
          {plan.features.map((feature) => (
            <li key={feature}>
              <span>✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="pricing-card__actions">
          <button type="button" className="pricing-card__demo" onClick={() => onDemo(plan)}>
            Demo
          </button>
          <button type="button" className="pricing-card__buy" onClick={() => onBuy(plan)}>
            Buy
          </button>
        </div>
      </div>
    </article>
  );
}

export default PricingCard;
