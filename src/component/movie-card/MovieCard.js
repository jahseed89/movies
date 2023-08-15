import React from 'react'

const MovieCard = ({movie}) => {

  return (
    <div className='border rounded-2xl px-4 py-2 shadow	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'>
        <h3 className='text-xl'>{movie.title}</h3>
        <img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt={`${movie.title} poster`} />
        <p>{movie.release_date}</p>
    </div>
  )
}

export default MovieCard