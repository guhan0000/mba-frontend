import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { getAllMovies } from "../api/movies.js";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data);
        // console.log(data);

        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <Container>
      <h1 className="font-display mb-1" style={{ fontSize: "1.6rem" }}>
        Now Showing
      </h1>
      <p className="text-muted-soft mb-4">
        Pick a movie to see details and book your show.
      </p>

      {status === "loading" && <LoadingState label="Loading movies…" />}
      {status === "error" && (
        <ErrorState message="Couldn't load movies. Is the backend running?" />
      )}
      {status === "ready" && movies.length === 0 && (
        <p className="text-muted-soft">No movies available right now.</p>
      )}

      <Row xs={2} sm={3} md={4} lg={5} className="g-3">
        {movies.map((movie) => (
          <Col key={movie.movieId}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
