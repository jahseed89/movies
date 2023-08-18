import React, { useContext, useState } from "react";
import { BrandLoader } from "../../component/index";
import MovieDataContext from "../../Context";
import { Toaster, toast } from "react-hot-toast";

const MovieRecommendation = () => {
  const { isLoaded, movies, genres } = useContext(MovieDataContext);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState([]);

  const handleGenreClick = (genreId) => {
    setSelectedGenreId(genreId);
    const moviesOfSelectedGenre = movies.filter((movie) =>
      movie.genre_ids.includes(genreId)
    );
    addToLocalStorage(moviesOfSelectedGenre);
  };

  const filteredMovies = selectedGenreId
    ? movies.filter((movie) => movie.genre_ids.includes(selectedGenreId))
    : [];

  const viewMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const addToLocalStorage = (movies) => {
    try {
      const storedMoviesJSON = localStorage.getItem("savedMovies");
      const storedMovies = storedMoviesJSON ? JSON.parse(storedMoviesJSON) : [];
  
      const storedGenresJSON = localStorage.getItem("savedGenres");
      const storedGenres = storedGenresJSON ? JSON.parse(storedGenresJSON) : [];
  
      let genreAlreadyExists = false;
  
      movies.forEach((movie) => {
        const isMovieInStorage = storedMovies.some(
          (storedMovie) => storedMovie.id === movie.id
        );
  
        if (!isMovieInStorage) {
          storedMovies.push(movie);
          if (!storedGenres.includes(selectedGenreId)) {
            storedGenres.push(selectedGenreId);
          }
        } else {
          genreAlreadyExists = true;
        }
      });
  
      if (genreAlreadyExists) {
        toast(`This movies already in your local storage`, {
          position: "top-center",
          style: {
            background: "#ff0000",
            color: "#ffffff",
          },
        });
      } else {
        toast(`Movies added to local storage successfully`, {
          position: "top-center",
          style: {
            background: "rgb(96 165 250)",
            color: "#fff",
          },
        });
      }
  
      localStorage.setItem("savedMovies", JSON.stringify(storedMovies));
    } catch (error) {
      console.error("Error while storing movies:", error);
    }
  };
  
  return (
    <div>
      <Toaster />
      <div>
        <div>
          {isLoaded ? (
            <BrandLoader />
          ) : (
            <div>
              <div className="flex">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    className="bg-gray-200 px-2 py-1 text-blue-400"
                    onClick={() => handleGenreClick(genre.id)}
                    style={{ border: "1px solid #fff" }}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
              <div>
                {filteredMovies.map((movie) => (
                  <div key={movie.id} className="flex justify-between px-3">
                    <div className="my-4">
                      <p>{movie.title}</p>
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                        alt={`${movie.title} poster`}
                      />
                      <p>
                        <button
                          className="text-sm bg-blue-400 rounded-lg text-white px-3 py-2"
                          onClick={() => viewMovieDetails(movie)}
                        >
                          More Details
                        </button>
                      </p>
                    </div>
                    {selectedMovie && selectedMovie.id === movie.id && (
                      <div
                        className="shadow	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) rounded-2xl px-4 py-2"
                        style={{
                          border: "2px solid rgb(59 130 246 / 0.5)",
                          width: "50%",
                        }}
                      >
                        <h1 className="font-bold">
                          Title: {selectedMovie.title}
                        </h1>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
                          alt={`${selectedMovie.title} poster`}
                          className="my-4"
                        />
                        <p>
                          <span className="font-bold">Description: </span>
                          {selectedMovie.overview}
                        </p>
                        <p className="my-4">
                          <span className="font-bold">Popularity:</span>
                          {selectedMovie.popularity}
                        </p>
                        <p>
                          <span className="font-bold">Release date: </span>
                          {selectedMovie.release_date}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendation;
