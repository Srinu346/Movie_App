import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";

function MovieCard({ movie }) {
    const { favourites, isFavourite, addToFavourite, removeFromFavourite } = useMovieContext();
    const favorite = isFavourite(movie.id); // TMDB uses `id`

    function onLike(e) {
        e.preventDefault();
        if (favorite) removeFromFavourite(movie.id);
        else addToFavourite(movie);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB image base URL + poster_path
                    alt={movie.title || movie.name} // `title` for movies, `name` for TV shows
                />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onLike}>🤍</button>
                </div>
            </div>
            <div className="movie-details">
                <h2>{movie.title || movie.name}</h2>
                <p>{(movie.release_date || movie.first_air_date || "").split("-")[0]}</p>
            </div>
        </div>
    );
}

export default MovieCard;
