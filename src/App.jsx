import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchPicture() {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=ddjj3qap7F3iGQRbCFcuHL4g9XUP05gbz8llmE90`,
    );
    setPicture(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPicture();
  }, []);

  return (
    <>
      <div>
        <h1>Space Explorer</h1>
        <div>{loading ? "Loading..." : picture.title}</div>
        {!loading && (
          <>
            <img src={picture.url} alt={picture.title} />
            <p>{picture.explanation}</p>
          </>
        )}
        <button onClick={fetchPicture}>New Photo</button>
      </div>
    </>
  );
}

export default App;
