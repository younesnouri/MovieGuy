import React, {useState, useEffect} from 'react'
import { Resultcard } from './Resultcard'

 export const SearchBarUsers = () => {
  
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleOverlayClick = () => {
      setSearchTerm('');
    }
    useEffect(() => {
      const performSearch = async () => {
        if (!searchTerm) {
          setSearchResults([]);
          return;
        }
  
        setIsLoading(true);
        setError(null);
  
        try {
          const response = await fetch(`http://localhost:5000/search?term=${encodeURIComponent(searchTerm)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          setError('Failed to fetch search results');
          console.error('There was an error!', error);
        }
  
        setIsLoading(false);
      };
  
      // Debouncing: Introduce a delay before the search is performed
      const delayDebounce = setTimeout(() => {
        performSearch();
      }, 300); // 300ms delay
  
      // Cleanup function to cancel the timeout if the component unmounts
      return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

  return (
    <div className='add-popup'>
      <div className='add-content'>
            <div className='input-wrapperr'>
              <input type='text' placeholder='Search for users'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}

              />
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className="search-results">
              {searchResults.map((user, index) => (
                <div key={index}>{user.username}</div> // Adjust according to your user object properties
              ))}
            </div>
            </div>
            </div>

  );
};


