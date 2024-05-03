
import React, { useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './log.css';

import Loader from '../Loader/Loader';
import GlobalContext from '../../Context/GlobalContext';

function Login() {
  
    const [reload,setReload]= useState(0);
    const {setIsLoggedIn,userType,logInApi} = useContext(GlobalContext);

    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      isAdmin: userType,
    });
  
    const [isLoading, setIsLoading] = useState(false);
  
  
    async function loginHandler() {
      try {
        setIsLoading(true);
  
        const response = await fetch(`${logInApi}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const res_data = await response.json();
  
          localStorage.setItem("token", res_data.token);
          localStorage.setItem("user", JSON.stringify(res_data.user));
          localStorage.setItem("isAdmin", JSON.stringify(res_data.user.isAdmin));
          setIsLoggedIn(true);
  
          toast.success('Logged In Successfully 😊');
  
          navigate(userType ? '/admin/dashboard' : '/cust/dashboard');
  
        } else {
          const errorMessage = await response.json();
          toast.error(`Login failed: ${errorMessage.message}`);
        }
      } catch (error) {
        console.error('Error during Login:', error);
      } finally {
        setIsLoading(false);
      }
      setReload(reload +1);
    }

    useEffect(()=>{

    },[reload])
  
    function changeHandler(event) {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  return(
    <>
      
      <div className="login" >
        <center>
         
          <div className="form">
            <div class="title_container">
              <p class="title">Login to your Account as {userType === true ? 'Admin' : 'Customer'}</p>
              <span class="subtitle">Get started with our app, just log in to your account and enjoy the experience.</span>
            </div>
            <div className="flex-column">
              <label for="email">Email address:</label>
            </div>
            <div className="inputForm">
              <i class="fa-solid fa-at" style={{color: "#000000"}}></i>
              <input type="email" id="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={changeHandler} required />
            </div>
                
            <div className="flex-column">
              <label for="pwd">Password:</label>
            </div>
            <div className="inputForm">
              <i class="fa-solid fa-lock" style={{color: "#000000"}}></i>
              <input type="password" id="password" name="password" placeholder="Enter password" value={formData.password} onChange={changeHandler} required />
            </div>
                
            <div className="flex-row">
              <div>
                <input type="checkbox" />
                <label>Remember me </label>
              </div>
              <span className="span">Forgot password?</span>
            </div>
                
            <button onClick={loginHandler} className="button-submit">Log in</button>
                
            {isLoading && (
                <div className="loader-container">
                    <Loader />
                </div>
            )}

                
            <Link to="/signup">
                <p className="p">Don't have an account? <span className="span">Sign Up as {userType === true ? 'Admin' : 'Customer'}</span></p>
            </Link>

            <p className="p line">Or With</p>
                
            <div className="flex-row">
              <button className="btn google"><img src="./Images/google.png" width="18px" alt="" />Google</button>
                    
              <button className="btn apple"><i class="fa-brands fa-apple" style={{color: "#000000"}}></i> Apple</button>
            </div>
          </div>
        </center>
      </div>
    </>
  );
}

export default Login;
