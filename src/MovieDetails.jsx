import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, BASE_URL } from './api';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);

 useEffect(() => {
    const favs = localStorage.getItem('favorites');
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: API_KEY,
              language: 'pt-BR',
              append_to_response: 'credits',
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const toggleFavorite = () => {
    let updated;
    if (favorites.some((fav) => fav.id === movie.id)) {
      updated = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (error || !movie) return <p>Erro ao carregar detalhes do filme.</p>;

  const director = movie.credits.crew.find((c) => c.job === 'Director');
  const cast = movie.credits.cast.slice(0, 5).map((actor) => actor.name).join(', ');
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="movie-details-container clearfix">
      <Link to="/">← Voltar para busca</Link>
      <h1>{movie.title} ({movie.release_date?.slice(0, 4)})</h1>

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : 'https://via.placeholder.com/150x225?text=Sem+Imagem'
        }
        alt={movie.title}
        className="movie-details-poster"
      />

      <button
        onClick={toggleFavorite}
        className={`movie-details-fav-btn ${isFavorite ? 'favorited' : 'not-favorited'}`}
      >
        {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      </button>

      <p><strong>Diretor:</strong> {director ? director.name : 'N/A'}</p>
      <p><strong>Elenco:</strong> {cast || 'N/A'}</p>
      <p><strong>Avaliação:</strong> {movie.vote_average} / 10</p>
      <p><strong>Sinopse:</strong> {movie.overview}</p>

      <div className="clearfix"></div>
    </div>
  );
}
