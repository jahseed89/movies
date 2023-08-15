import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, MovieRecommendation, MovieDetails } from "./pages/index";
import { NavBar } from "./component/index";
import MovieDataContext from "./Context";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genresId] = useState([])
  const url = "https://api.themoviedb.org/3/discover/movie";
  const genreUrl = "https://api.themoviedb.org/3/genre/movie/list";

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoaded(true);
      const resp = await axios.get(`${url}?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=${genresId}`);

      setMovies(resp.data.results);
      setTimeout(() => {
        setIsLoaded(false);
      }, 5000);
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${genreUrl}?api_key=${process.env.REACT_APP_TMDB_KEY}`);
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchMovieData();
    fetchGenres();
  }, [genresId]);

  return (
    <>
      <NavBar />
      <MovieDataContext.Provider value={{ isLoaded, movies, genres }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-recommend" element={<MovieRecommendation />} />
          <Route path="/movie-details" element={<MovieDetails />} />
        </Routes>
      </MovieDataContext.Provider>
    </>
  );
};

export default App;

