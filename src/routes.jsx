import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Favorites from './Favorites';
import MovieDetails from './MovieDetails'; // <- import

export default function RoutesApp() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = localStorage.getItem('favorites');
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, []);

  const toggleFavorite = (movie) => {
    let updated;
    if (favorites.some((fav) => fav.id === movie.id)) {
      updated = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<App favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favoritos"
          element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/movie/:id"
          element={<MovieDetails favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
