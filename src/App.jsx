import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPictures() {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=ddjj3qap7F3iGQRbCFcuHL4g9XUP05gbz8llmE90&start_date=2026-08-01&end_date=2026-08-11`,
    );
    setPictures(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPictures();
  }, []);

  return (
    <>
      <div>
        <h1>Space Explorer</h1>
        {loading && <div>Loading...</div>}
        {!loading &&
          pictures.map((pic) => (
            <div key={pic.date}>
              <h2>{pic.title}</h2>
              <img src={pic.url} alt={pic.title} />
              <p>{pic.explanation}</p>
            </div>
          ))}
        <button onClick={fetchPictures}>New Photo</button>
      </div>
    </>
  );
}

export default App;
