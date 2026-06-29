import client from "./client.js";

// GET /api/show/calendar/{movieId} -> { "2026-06-20": Show[], ... }
export const getCalendar = (movieId) =>
  client.get(`/show/calender/${movieId}`).then((res) => res.data);

// GET /api/show/theatres/{movieId}?date=YYYY-MM-DD -> { "PVR Cinemas": Show[], ... }
export const getTheatresWithShows = (movieId, date) =>
  client
    .get(`/show/get/${movieId}/`, { params: { showDate: date } })
    .then((res) => res.data);

// GET /api/show/seats/{showId} -> ShowSeat[] (AVAILABLE only)
export const getAvailableSeats = (showId) =>
  client.get(`/show/seats/${showId}`).then((res) => res.data);

// GET /api/show/seats/count/{showId} -> number
export const getAvailableSeatCount = (showId) =>
  client.get(`/show/seats/count/${showId}`).then((res) => res.data);
