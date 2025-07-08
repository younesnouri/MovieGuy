import React, {useState} from 'react'
import { Resultcard2 } from './ResultCard2.js'
export const Add = () => {
    const [query,setQuery] = useState("")
    const [results,setResults] = useState([])
    const onChange= (e) =>{
        e.preventDefault();
        setQuery(e.target.value)

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=3ea4fa01d32e2964852b911667dd32ab&include_adult=false&language=en-US&page=1&query=${e.target.value}`)
        .then((res)=>res.json())
        .then(data =>{
            if (!data.errors){

                setResults(data.results)
            }else{
                setResults([])
            }
            
        })
    }
    console.log(results)
  return (
    <div className='add-page'>
        <div className='container'>
            <div className='add-content'>
               <div className='input-wrapper'>
                <input type='text' placeholder='Search for a movie' 
                value = {query} onChange={onChange} />
                </div> 
                {results.length > 0 && (
                    <ul className='resultshorizon'>
                        {results.map((movie) =>
                         (<li key={movie.id}>
                            <Resultcard2 movie ={movie} type = 'add'/>
                            
                            </li>))}
                    </ul>
                )}

            </div>
        </div>
    </div>
  )
}


