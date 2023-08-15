import React from 'react'

const MovieDataContext = React.createContext({
    isLoaded: false,
    movies: [],
    genres: []
})
export default MovieDataContext