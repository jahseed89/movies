import React from "react";

const SavedMovies = () => {
  const storedMoviesJSON = localStorage.getItem("savedMovies");
  const storedMovies = storedMoviesJSON ? JSON.parse(storedMoviesJSON) : [];
  console.log(storedMovies);
  return (
    <div className="px-4">
      <h1 className="text-6xl font-bold text-center">Saved Movies</h1>
      <div className="flex justify-between flex-wrap">
        {storedMovies.map((movie) => (
          <div key={movie.id} className=" my-5 w-80">
            <p className="font-bold text-3xl">{movie.title}</p>
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`}
              alt={`${movie.title} poster`}
              className="my-4"
            />
            <p>{movie.overview}</p>
            <p className="mt-2">Popularity: {movie.popularity}</p>
            <p className="font-bold my-2">Release year: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedMovies;
