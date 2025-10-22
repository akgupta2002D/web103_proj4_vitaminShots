import { useEffect, useState } from "react";
import { getShotById, updateShot } from "../services/shotsAPI";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import BottleDisplay from "./BottleDisplay";

export default function EditShot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shot, setShot] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getShotById(id);
      setShot(data);
    }
    fetchData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    let updated = { ...shot, [name]: value };
    let price = 3;
    if (updated.base_juice === "Beetroot") price += 1;
    if (updated.supplement === "Turmeric") price += 0.5;
    updated.price = price;
    setShot(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateShot(id, shot);
    navigate("/");
  }

  if (!shot) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <h1>Edit {shot.name}</h1>

      <BottleDisplay
        name={shot.name || "Your Shot Preview"}
        base={shot.base_juice}
        supplement={shot.supplement}
        flavor={shot.flavor}
        benefit={shot.benefit}
      />

      <form className="form" onSubmit={handleSubmit}>
        <input name="name" value={shot.name} onChange={handleChange} />

        <label>Base Juice</label>
        <select name="base_juice" value={shot.base_juice} onChange={handleChange}>
          <option>Orange</option>
          <option>Coconut</option>
          <option>Beetroot</option>
        </select>

        <label>Supplement</label>
        <select name="supplement" value={shot.supplement} onChange={handleChange}>
          <option>Vitamin C</option>
          <option>Iron</option>
          <option>Turmeric</option>
        </select>

        <label>Flavor</label>
        <select name="flavor" value={shot.flavor} onChange={handleChange}>
          <option>Ginger</option>
          <option>Mint</option>
          <option>Lemon</option>
        </select>

        <label>Benefit</label>
        <select name="benefit" value={shot.benefit} onChange={handleChange}>
          <option>Immunity</option>
          <option>Gut Health</option>
          <option>Energy</option>
        </select>

        <p><b>Total Price:</b> ${shot.price}</p>
        <button type="submit" className="button">Update Shot</button>
      </form>
    </div>
  );
}
