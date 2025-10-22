import { useNavigate } from "react-router-dom";
import BottleDisplay from "../pages/BottleDisplay";

export default function ShotCard({ shot, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="image-placeholder">
        <BottleDisplay
          name={shot.name || "Your Shot Preview"}
          base={shot.base_juice}
          supplement={shot.supplement}
          flavor={shot.flavor}
          benefit={shot.benefit}
        />
      </div>
      <h3>{shot.name}</h3>
      <p><b>Base:</b> {shot.base_juice}</p>
      <p><b>Supplement:</b> {shot.supplement}</p>
      <p><b>Flavor:</b> {shot.flavor}</p>
      <p><b>Benefit:</b> {shot.benefit}</p>
      <p><b>Price:</b> ${shot.price}</p>
      <div className="card-buttons">
        <button onClick={() => navigate(`/edit/${shot.id}`)}>Edit</button>
        <button className="delete" onClick={() => onDelete(shot.id)}>Delete</button>
      </div>
    </div>
  );
}
