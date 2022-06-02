import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { Profile, Movie, Home } from "./pages";
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:movieId" element={<Movie />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
