import React, { useContext } from "react";
import { BrandLoader, MovieCard } from "../../component/index";
import MovieDataContext from "../../Context";

const Home = () => {
  const { isLoaded, movies } = useContext(MovieDataContext);

  return (
    <div className="bg-gray-200">
      <h1 className="text-3xl text-blue-600 p-x-4 text-center">Movies</h1>
      {isLoaded ? (
        <BrandLoader />
      ) : (
        <div className="flex flex-wrap gap-4">
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

