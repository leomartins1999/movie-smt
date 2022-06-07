import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { Profile, Movie, Home, PopularMovies, Movies, TopRatedMovies } from "./pages";
import "./index.css";
import { TVShows } from "./pages/TVShows";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="/PopularMovies" element={<PopularMovies />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/TVShows" element={<TVShows />} />
            <Route path="/TopRatedMovies" element={<TopRatedMovies />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
