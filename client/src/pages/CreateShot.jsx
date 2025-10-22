import { useState } from "react";
import { createShot } from "../services/shotsAPI";
import "../App.css";
import BottleDisplay from "./BottleDisplay";

export default function CreateShot() {
  const [shot, setShot] = useState({
    name: "",
    base_juice: "",
    supplement: "",
    flavor: "",
    benefit: "",
    price: 3
  });

  const [error, setError] = useState("");     // backend validation message
  const [showPopup, setShowPopup] = useState(false); // popup visibility

  function handleChange(e) {
    const { name, value } = e.target;
    let newShot = { ...shot, [name]: value };

    // Simple price logic
    let price = 3;
    if (newShot.base_juice === "Beetroot") price += 1;
    if (newShot.supplement === "Turmeric") price += 0.5;
    newShot.price = price;

    setShot(newShot);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await createShot(shot);

      // Backend validation sends { error: "..." }
      if (response.error) {
        setError(response.error);
        setShowPopup(true);
        return;
      }

      // Success — redirect to home
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Error creating shot:", err);
      setError("Something went wrong while creating your shot.");
      setShowPopup(true);
    }
  }

  function handleClosePopup(action) {
    setShowPopup(false);
    if (action === "home") {
      window.location.href = "/";
    } else if (action === "new") {
      // reset form
      setShot({
        name: "",
        base_juice: "",
        supplement: "",
        flavor: "",
        benefit: "",
        price: 3
      });
      setError("");
    }
  }

  return (
    <div className="page-container">
      <h1>Create Your Vitamin Shot</h1>

      <BottleDisplay
        name={shot.name || "Your Shot Preview"}
        base={shot.base_juice}
        supplement={shot.supplement}
        flavor={shot.flavor}
        benefit={shot.benefit}
      />

      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Shot name" onChange={handleChange} />

        <div className="feature-group">
          <label>Base Juice</label>
          <select name="base_juice" onChange={handleChange}>
            <option value="">Select Base</option>
            <option value="Orange">Orange</option>
            <option value="Coconut">Coconut</option>
            <option value="Beetroot">Beetroot</option>
          </select>
          <div className="img-placeholder">{/* Base image here */}</div>
        </div>

        <div className="feature-group">
          <label>Supplement</label>
          <select name="supplement" onChange={handleChange}>
            <option value="">Select Supplement</option>
            <option value="Vitamin C">Vitamin C</option>
            <option value="Iron">Iron</option>
            <option value="Turmeric">Turmeric</option>
          </select>
          <div className="img-placeholder">{/* Supplement image here */}</div>
        </div>

        <div className="feature-group">
          <label>Flavor</label>
          <select name="flavor" onChange={handleChange}>
            <option value="">Select Flavor</option>
            <option value="Ginger">Ginger</option>
            <option value="Mint">Mint</option>
            <option value="Lemon">Lemon</option>
          </select>
          <div className="img-placeholder">{/* Flavor image here */}</div>
        </div>

        <div className="feature-group">
          <label>Benefit</label>
          <select name="benefit" onChange={handleChange}>
            <option value="">Select Benefit</option>
            <option value="Immunity">Immunity</option>
            <option value="Gut Health">Gut Health</option>
            <option value="Energy">Energy</option>
          </select>
          <div className="img-placeholder">{/* Benefit image here */}</div>
        </div>

        <p><b>Total Price:</b> ${shot.price.toFixed(2)}</p>
        <button type="submit" className="button">Save Shot</button>
      </form>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>⚠️ Invalid Combination</h2>
            <p>{error}</p>
            <div className="popup-buttons">
              <button onClick={() => handleClosePopup("home")}>🏠 Go Home</button>
              <button onClick={() => handleClosePopup("new")}>➕ Create Another</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
