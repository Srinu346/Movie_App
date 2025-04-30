import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites");
        if (storedFavs) setFavourites(JSON.parse(storedFavs));
    }, []);

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavourite = (movie) => {
        setFavourites((prev) => [...prev, movie]);
    };

    const removeFromFavourite = (movieId) => {
        setFavourites((prev) => prev.filter(movie => movie.imdbID !== movieId));
    };

    const isFavourite = (movieId) => {
        return favorites.some(movie => movie.imdbID === movieId);
    };

    const value = {
        favorites,
        addToFavourite,
        removeFromFavourite,
        isFavourite
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
