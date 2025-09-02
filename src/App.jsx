import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
import { API_KEY, BASE_URL } from './api';

function App({ favorites, toggleFavorite }) {
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleInputChange = (e) => setSearch(e.target.value);

  useEffect(() => {
    if (search.trim() === '') {
      setSearchTerm('');
      setPage(1);
    }
  }, [search]);

  const fetchMovies = useCallback(
    async (term, pageNumber = 1) => {
      if (term.trim() === '') return;

      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            query: term,
            language: 'pt-BR',
            page: pageNumber,
          },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        alert('Erro ao buscar filmes, tente novamente.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchPopular = useCallback(
    async (pageNumber = 1) => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            page: pageNumber,
          },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
        alert('Erro ao buscar filmes populares, tente novamente.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchMovies(searchTerm, page);
    } else {
      fetchPopular(page);
    }
  }, [page, searchTerm, fetchMovies, fetchPopular]);

  const handleSearch = () => {
    if (search.trim() === '') return;
    setSearchTerm(search);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <h1>Buscar Filmes</h1>

        <nav>
          <Link to="/favoritos" className="nav-link">
            ⭐ Ver Favoritos
          </Link>
        </nav>

        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o nome do filme..."
            value={search}
            onChange={handleInputChange}
            className="search-input"
          />
          <button type="submit" className="btn">
            Buscar
          </button>
        </form>
      </div>

      {loading && <p className="loading-text">Carregando...</p>}

      {searchTerm.trim() === '' && movies.length > 0 && (
        <h2 className="section-title">Filmes Populares</h2>
      )}

      <div className="movie-grid">
        {movies.map((movie) => {
          const isFavorite = favorites.some((fav) => fav.id === movie.id);
          return (
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
                className={isFavorite ? 'btn remover' : 'btn'}
              >
                {isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
              </button>
            </div>
          );
        })}
      </div>

      {movies.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1} className="btn">
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages} className="btn">
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

export default App;