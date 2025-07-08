import React, { useState, useEffect } from 'react';
import './loginregistration.css';
import {  useNavigate } from 'react-router-dom';
import {useAuth} from './AuthProvider';


export const LoginRegistration = () => {

  const [selectedFilterClass, setSelectedFilterClass] = useState('');
  const [backgroundStyle, setBackgroundStyle] = useState({
    backgroundImage: '',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  });

  useEffect(() => {
  const imageUrls = [
                    
    require('./images/driveimg.jpg'),require('./images/jkrpstr.jpg'),require('./images/thesocial.jpg'),require('./images/thebatt.jpg'),require('./images/007.jpg'),
    require('./images/bladerunner2.jpg'),require('./images/driveee.jpg'),require('./images/fightclub.jpg'),require('./images/her.jpg'),require('./images/johnwick.jpg'),require('./images/laland.jpg'),
    require('./images/memonto.jpg'),require('./images/pulp.jpg'),require('./images/pulpf.jpg'),require('./images/skyfall1.jpg'),require('./images/swan.jpg'),
    require('./images/truman4.jpg')


// Add more image URLs as needed
];

// Randomly select an image URL
const randomIndex = Math.floor(Math.random() * imageUrls.length);
const randomImageUrl = imageUrls[randomIndex];
console.log(randomImageUrl)

const filterClasses = ['pink-filter', 'green-filter',  'blue-filter','red-filter','white-filter','orange-filter','pink-filter','blue-filter','red-filter','purple-filter',
'purple-filter','white-filter','yellow-filter','yellow-filter','white_filter','white-filter','blue-filter'];

// Apply the selected filter class
const selectedFilterClass = filterClasses[randomIndex];

const backgroundStyle =  {
backgroundImage: `url(${randomImageUrl})`,
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat',
backgroundPosition: 'center',
}


console.log(selectedFilterClass)
setSelectedFilterClass(selectedFilterClass);
    setBackgroundStyle(backgroundStyle);
}, []);

  const [isSignUp, setIsSignUp] = useState(true);

  const handleToggle = () => {
    setIsSignUp(false);
  };

  const handleToggle1 = () => {
    setIsSignUp(true);
  };
  


  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const navigate = useNavigate()
  const { user, login } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
   
    
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data= await response.json()
        localStorage.setItem('token', data.token);
        login(formData.username);
        setMessage('Login successful.');
        localStorage.setItem('user_id', data.user_id);
        
        
        
        
        
        navigate("/")
        
        // You can handle successful login actions here, e.g., redirect the user.
      } else {
        const data = await response.json();
        setMessage(data.error || 'Error logging in.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error logging in.');
    }
  };

  const [formDataSignup, setFormDataSignup] = useState({
    username: '',
    password: '',
  });

  const [messageSignup, setMessageSignup] = useState('');

  const handleChangeSignup = (e) => {
    const { name, value } = e.target;
    setFormDataSignup({ ...formDataSignup, [name]: value });
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataSignup),
      });

      if (response.ok) {
        const data = await response.json();
        setMessageSignup(data.message || 'User registered succesfully');
        setFormDataSignup({ username: '', password: '' });
      } else {
        const data = await response.json();
        setMessageSignup(data.error || 'Error registering user.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessageSignup('Error registering user.');
    }
  };

    

  return (
    <div className={`container-fluid-login-background ${selectedFilterClass}`} style={containerStyle}>
    <div className={`form-container ${isSignUp ? 'slide-up' : ''}`}>
    <div className="form-structor"  style={backgroundStyle}>
    
      <div className={isSignUp ? 'signup' : 'signup slide-up'}>
        <h2 className="form-title1" id="signup" onClick={handleToggle1}>
        {!isSignUp ? (
            <span>or</span>
          ) : null}
          Login
        </h2>
        
        <div className="form-holder">
          <input type="text" className="input" placeholder="Name"  name='username' value={formData.username}
                    onChange={handleChange}
                    required />
          
          <input type="password" className="input" placeholder="Password"  name='password' value={formData.password}
                    onChange={handleChange}
                    required />
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Login</button>
        <div >
        <h2 className="message" style={{ height: '20px' }}> {message}</h2>
        </div>
      </div>
      
      
      
      <div className={isSignUp ? 'login slide-up' : 'login'}>
        <div className="center">
          <h2 className="form-title1" id="login" onClick={handleToggle}>
          {isSignUp ? (
              <span>or</span>
            ) : null}
            Sign up
          </h2>
          <div className="form-holder">
            <input type="text" className="input" placeholder="username" name='username'
                    
                    value={formDataSignup.username}
                    onChange={handleChangeSignup}
                    required />
            <input type="password" className="input" placeholder="Password"  name='password'
                    
                    value={formDataSignup.password}
                    onChange={handleChangeSignup}
                    required/>
          </div>
          <button className="submit-btn" onClick={handleSubmitSignup}>Sign up</button>
          <div>
        <h2 className="message" style={{ height: '20px' , color : 'black'}}> {messageSignup}</h2>
        </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
