import { Link } from 'react-router-dom';
import './App.css';

export default function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="favorites-container">
      <h1>Filmes Favoritos</h1>

      <nav>
        <Link to="/" className="nav-link">
          ← Voltar à Busca
        </Link>
      </nav>

      {favorites.length === 0 ? (
        <p>Nenhum filme favorito ainda.</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`} className="movie-link">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      : 'https://via.placeholder.com/342x513?text=Sem+Imagem'
                  }
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>Ano: {movie.release_date?.slice(0, 4) || 'N/A'}</p>
                </div>
              </Link>

              <button
                onClick={() => toggleFavorite(movie)}
                className="btn remover"
              >
                Remover dos favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
