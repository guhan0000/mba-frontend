import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import SeatSelection from "./pages/SeatSelection.jsx";

export default function App() {
  return (
    <>
      <AppNavbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/shows/:showId/seats" element={<SeatSelection />} />
        </Routes>
      </main>
    </>
  );
}
