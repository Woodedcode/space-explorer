import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import companyLogo1 from "./assets/logo-main.png";

function App() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  async function fetchPictures(startDate, endDate) {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=ddjj3qap7F3iGQRbCFcuHL4g9XUP05gbz8llmE90&start_date=${startDate}&end_date=${endDate}`,
    );
    setPictures(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPictures("2026-08-01", "2026-08-11");
  }, []);

  const filteredPictures = pictures.filter((pic) =>
    pic.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPictures = [...filteredPictures].sort((a, b) => {
    if (sortAsc) {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  function getPreviousRange() {
    const earliest = pictures.length
      ? new Date(pictures[0].date)
      : new Date("2026-08-01");
    const newEnd = new Date(earliest);
    newEnd.setDate(newEnd.getDate() - 1);
    const newStart = new Date(newEnd);
    newStart.setDate(newStart.getDate() - 10);

    const format = (d) => d.toISOString().split("T")[0];
    return { start: format(newStart), end: format(newEnd) };
  }

  return (
    <>
      <div>
        <a href="https://woodedcode.github.io/e-portfolio-build/" className="top-link">
          ← Back to Portfolio
        </a>

        <h1>NovaReach: Space Explorer</h1>

        <div className="header-logos">
          <img src={companyLogo1} alt="Logo 1" />
        </div>

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort: {sortAsc ? "Oldest First" : "Newest First"}
        </button>

        {loading && <div>Loading...</div>}

        {!loading &&
          sortedPictures.map((pic) => (
            <div key={pic.date}>
              <h2>{pic.title}</h2>
              <img
                src={pic.url}
                alt={pic.title}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <p>{pic.explanation}</p>
            </div>
          ))}

        <button
          onClick={() => {
            const { start, end } = getPreviousRange();
            fetchPictures(start, end);
          }}
        >
          Load Earlier Photos
        </button>

        <footer className="footer-logos">
          <p>
            Powered by{" "}
            <a href="https://api.nasa.gov" target="_blank" rel="noreferrer">
              NASA APOD API
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;