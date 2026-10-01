import "./AnimatedBackground.css";

const balls = Array.from({ length: 8 }, (_, index) => index + 1);

function AnimatedBackground() {
  return (
    <div className="animated-background" aria-hidden="true">
      <div className="background-glow background-glow--pink" />
      <div className="background-glow background-glow--blue" />
      <div className="background-glow background-glow--purple" />
      <div className="background-grid" />
      <div className="background-orb background-orb--left" />
      <div className="background-orb background-orb--right" />

      <div className="balls">
        {balls.map((ball) => (
          <span key={ball} className={`ball ball--${ball}`} />
        ))}
      </div>
    </div>
  );
}

export default AnimatedBackground;
