import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import "./figma/style.css";
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Header = () => {
  
  const { user, logout } = useAuth();
  const location = useLocation(); 

  const isActive = (path) => {
    
    return location.pathname === path;
  };
  const image = require("./images/driveimg.jpg")
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/home" className={isActive('/home') ? 'active-link' : ''}>MovieGuy</Link>
          </div>
          <ul className="nav-links">


            {user.auth && ( // Conditionally render these links only if user is authenticated
              <>
                <li>

                  <Link to="/Profile" className={isActive('/Profile') ? 'count-pill' : ''} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <div class="circlee1">
                      <img src={image} alt="Your Image" />
                    </div>
                    <span style={{ marginLeft: '10px' }}>{user.username}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className={isActive('/') ? 'active-link' : ''}>Watchlist</Link>
                </li>
                <li>
                  <Link to="/watched" className={isActive('/watched') ? 'active-link' : ''} >Watched</Link>
                </li>
                <li>
                  <Link to="/favorites" className={isActive('/favorites') ? 'active-link' : ''}>Favorites</Link>
                </li>
                <li>
                  <Link to="/Reviews" className={isActive('/Reviews') ? 'active-link' : ''}>Reviews</Link>
                </li>
                <li>
                  <Link to="/Findsimilar" className={isActive('/Findsimilar') ? 'active-link' : ''}>Similar</Link>
                </li>
                <li>
                  <Link to="/Recommend" className={isActive('/Recommend') ? 'active-link' : ''}>Recommend</Link>
                </li>
               
                
                <li>
                  <Link to="/add" className='btn btn-success'>Search

                   </Link>
                </li>
                <li>
                  <button type="button" class="btn btn-outline-light" onClick={logout}>
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: '1.1em' }} />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};


