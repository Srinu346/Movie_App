import "../css/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
    const { favorites } = useMovieContext();

    return (
        <div className="favourites-page">
            <h1>Favourite Movies</h1>

            {favorites.length === 0 ? (
                <p>No favourite movies added yet.</p>
            ) : (
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.imdbID} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favourites;
