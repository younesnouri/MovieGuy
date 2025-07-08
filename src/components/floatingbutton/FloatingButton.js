import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../floatingbutton/floatingbutton.css'
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const FloatingButton = ({onClick}) => {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
    onClick && onClick(); // Call the provided onClick callback if it exists
  };

  return (
    <div className={`floating-button ${isActive ? 'active' : ''}`} onClick={handleButtonClick}>
      <i>
        <FontAwesomeIcon icon={isActive ? faPlus : faPlus} />
      </i>
    </div>
  );
};


