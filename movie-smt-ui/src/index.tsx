import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import {
  Movie,
  Home,
  Movies,
} from "./pages";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/movie/:movieId" element={<Movie />} />
              <Route path="/Movies" element={<Movies />} />
            </Route>
          </Routes>
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
