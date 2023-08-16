import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex justify-end'>
        <ul className='flex gap-4 py-6 px-4 text-lg font-bold'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='movie-recommend'>MovieRecommendation</Link></li>
            <li><Link to='my-movies'>My Movies</Link></li>
        </ul>
    </div>
  )
}

export default NavBar