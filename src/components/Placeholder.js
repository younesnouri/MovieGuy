import React from 'react'
import { MovieControls } from './MovieControls'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Placeholder = () => {
    
    const image = require("./images/plusi.jpeg")
    
    
    return (

        <div className='movie-card' style={{ cursor: 'pointer' }}>
            


            
            
                <img src={image} /> 
           


        </div>


    )
}


