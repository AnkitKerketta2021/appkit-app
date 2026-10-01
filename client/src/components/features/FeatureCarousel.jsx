import { useState } from "react";
import { Link } from "react-router";
import "./FeatureCarousel.css";

function FeatureCarousel({ carousel }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = carousel.slides[activeIndex];

  const previous = () => {
    setActiveIndex((current) =>
      current === 0 ? carousel.slides.length - 1 : current - 1
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === carousel.slides.length - 1 ? 0 : current + 1
    );
  };

  return (
    <article className="feature-carousel">
      <div className="feature-carousel__image-wrapper">
        <img
          src={activeSlide.image}
          alt={activeSlide.title}
          className="feature-carousel__image"
        />
        <div className="feature-carousel__badge">
          {activeSlide.category}
        </div>
      </div>

      <div className="feature-carousel__content">
        <span className="feature-carousel__counter">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(carousel.slides.length).padStart(2, "0")}
        </span>

        <span className="feature-carousel__section">
          {carousel.title}
        </span>

        <h2 className="feature-carousel__title">
          {activeSlide.title}
        </h2>

        <p className="feature-carousel__description">
          {activeSlide.description}
        </p>

        <div className="feature-carousel__actions">
          <Link
            to={`/features/${carousel.id}/${activeSlide.id}`}
            className="feature-carousel__explore"
          >
            Explore
          </Link>

          <div className="feature-carousel__controls">
            <button type="button" onClick={previous} aria-label="Previous feature">
              ←
            </button>
            <button type="button" onClick={next} aria-label="Next feature">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="feature-carousel__dots">
        {carousel.slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </article>
  );
}

export default FeatureCarousel;
