import React, { useEffect, useState } from 'react'
import { HomeCards } from './HomeCards'
import { HomeCards1 } from './HomeCards1'
import "./homecards.css"
export const Home = () => {
  const [popularMovie, setPopularMovie] = useState()
  const [topMovie, setTopMovie] = useState()

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3ea4fa01d32e2964852b911667dd32ab&language=en-US&page=1`)
      .then((res) => res.json())
      .then(data => {
        if (!data.errors) {
          setPopularMovie(data.results)

        } else {
          setPopularMovie([])
        }

      })
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=3ea4fa01d32e2964852b911667dd32ab&language=en-US&page=1`)
      .then((res) => res.json())
      .then(data => {
        if (!data.errors) {
          setTopMovie(data.results)

        } else {
          setTopMovie([])
        }

      })
  }, [])




  return (

    <div className='movie-list'>
      <h2 className='list-title ' style={{ marginLeft: '5%', color : 'white' }} >Popular </h2>
      <div className='list-cards'>
        {popularMovie?.slice(0, 12).map((movie) => (
          <HomeCards movie={movie} type = "home" />
        ))}


      </div>

      <h2 className='list-title ' style={{ marginLeft: '5%', color : 'white' }} >Top Rated </h2>
      <div className='list-cards'>
        {topMovie?.slice(0, 12).map((movie) => (
          <HomeCards movie={movie} type ="home" />
        ))}


      </div>
    </div>
  )
}


