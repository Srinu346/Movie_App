import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies,getPopularMovies} from "../services/api";

function Home() {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const loadPopularMovies = async ()=>{
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }
            catch(e){
                console.log("ERROR!!");
                setError("Failed To Fetch Movies");
            }
            finally{
                setLoading(false);
            }
        }
        loadPopularMovies();
    },[]);

    const handelSearch = async (e) => {
        e.preventDefault();

        if (!search.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResult = await searchMovies(search);
            setMovies(searchResult);
            setError(null);
        } catch (e) {
            console.log("ERROR!!!");
            setError("Failed to search movies");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form className="search-form" onSubmit={handelSearch}>
                <input
                    type="text"
                    placeholder="Search For Movies"
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
        </div>
    );
}

export default Home;
