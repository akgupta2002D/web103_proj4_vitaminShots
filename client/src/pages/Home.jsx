import { useEffect, useState } from "react";
import { getAllShots, deleteShot } from "../services/shotsAPI";
import ShotCard from "../components/ShotCard";
import "../App.css";

export default function Home() {
  const [shots, setShots] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllShots();
      setShots(data);
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    await deleteShot(id);
    setShots(shots.filter((s) => s.id !== id));
  }

  return (
    <div className="page-container">
      <h1 className="title">🍹 DIY Vitamin Shot Creator</h1>
      <a className="button" href="/create">+ Create New Shot</a>
      <div className="flex">
        {shots.map((shot) => (
          <ShotCard key={shot.id} shot={shot} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
