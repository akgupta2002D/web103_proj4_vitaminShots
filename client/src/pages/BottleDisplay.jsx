import "./Bottle.css";

export default function BottleDisplay({ name, base, supplement, flavor, benefit }) {
  // Color maps
  const baseColors = {
    Orange: "#FFA500",
    Coconut: "#E6E6E6",
    Beetroot: "#8B0000"
  };
  const supplementColors = {
    "Vitamin C": "#FCD34D",
    Iron: "#6B7280",
    Turmeric: "#F59E0B"
  };
  const flavorColors = {
    Ginger: "#D97706",
    Mint: "#10B981",
    Lemon: "#FDE68A"
  };
  const benefitColors = {
    Immunity: "#3B82F6",
    "Gut Health": "#A855F7",
    Energy: "#EF4444"
  };

  return (
    <div className="bottle-container">
      <div
        className="bottle"
        style={{ backgroundColor: baseColors[base] || "#ccc" }}
      >
        <div
          className="ribbon ribbon1"
          style={{ backgroundColor: supplementColors[supplement] || "transparent" }}
        ></div>
        <div
          className="ribbon ribbon2"
          style={{ backgroundColor: flavorColors[flavor] || "transparent" }}
        ></div>
        <div
          className="ribbon ribbon3"
          style={{ backgroundColor: benefitColors[benefit] || "transparent" }}
        ></div>
      </div>
      <p className="bottle-label">{name}</p>
    </div>
  );
}
