import React, { createContext,useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from './AuthProvider';



export const Login = () => {
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
  console.log(formData)

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
        
        login(formData.username);
        setMessage('Login successful.');
        
        
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

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cardStyle = {
    borderRadius: '1rem',
    maxWidth: '400px',
  };

  return (
           
       

    <div className='container-fluid-login-background' style={containerStyle}>
    <div className='container-fluid' style={containerStyle}>
      <div className='row'>
        <div className='col-12 d-flex justify-content-center'>

          <div className='card bg-dark text-white my-5' style={cardStyle}>
            <div className='card-body p-5 d-flex flex-column align-items-center'>

              <h2 className='fw-bold mb-2 text-uppercase'>Login</h2>
              <p className='text-white-50 mb-5'>Please enter your login and password!</p>

              <form onSubmit={handleSubmit} className='w-100'>
                <div className='mb-4'>
                  <label htmlFor='username' className='form-label text-white ' >
                    Username
                  </label>
                  <input
                    type='username'
                    id='username'
                    name='username'
                    className='form-control form-control-lg'
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label htmlFor='password' className='form-label text-white'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='form-control form-control-lg'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                

                <div className='text-center'>
                  <button className='btn btn-outline-light btn-lg px-5' type='submit'>
                               Login
                  </button>
               </div>

                         
                      </form>

                      {message && <p>{message}</p>}
                      


              <div>
                <br></br>
                
                

                <p className='mb-0'>
                  Don't have an account?{' '}
                  <Link to='/register' className='text-white-50 fw-bold'>
                     Sign Up
                  </Link>
                </p>
              </div>

              

            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
 
  );
}

  


