import client from "./client.js";

// GET /api/movies/all -> Movie[]
export const getAllMovies = () =>
  client.get("/movie/all").then((res) => res.data);
