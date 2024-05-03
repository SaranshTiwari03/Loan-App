import React, { useState ,useContext} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './log.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import GlobalContext from '../../Context/GlobalContext';

function Register() {
    const {userType,  signUpApi } = useContext(GlobalContext);
    

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: userType,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function signUpHandler(event) {
    event.preventDefault();

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch( `${signUpApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res_data = await response.json();
        toast.success('Account Created Successfully 😊');
       

        navigate('/login');
      } else {
        const errorMessage = await response.json();
        toast.error(`Signup failed: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;




    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }


    return (
        <>
            <div className='register'>
                <center>
                    <div className="form1">
                        <div class="title_container">
                            <p class="title">Create a new account </p>
                            <span class="subtitle">Sign Up as {(userType === true) ? 'Admin' : 'Customer'}</span>
                        </div>
                        <div className="flex-column1">
                            <label for="name">Username:</label>
                            <div className="inputForm">
                                <i class="fa-solid fa-user" style={{color: "#000000"}}></i>
                                <input type="text" id="username" name="name" placeholder='Enter Username' value={formData.name} onChange={changeHandler} required />
                            </div>
                        </div>
                        <div className="flex-column1">
                            <label for="email">Email:</label>
                            <div className="inputForm">
                                <i class="fa-solid fa-at" style={{color: "#000000"}}></i>
                                <input type="email" id="email" name="email"  placeholder='Enter Email' value={formData.email} onChange={changeHandler} required />
                            </div>
                        </div>
                        <div className="flex-column1">
                            <label for="pwd">Password:</label>
                            <div className="inputForm">
                                <i class="fa-solid fa-lock" style={{color: "#000000"}}></i>
                                <input type="password" id="password" name="password"  placeholder='Enter Password ' value={formData.password}  onChange={changeHandler} required />
                            </div>
                        </div>
                        
                        <br/>
                        <div className="flex-row">
                            <div>
                                <input type="checkbox" />
                                <label>Remember me </label>
                            </div>
                            <span className="span">Forgot password?</span>
                        </div>
                        <button onClick={signUpHandler} className="button-submit">Sign Up</button>

                        {isLoading && (
                            <div className="loader-container">
                                <Loader />
                            </div>
                        )}

                        <p className="p">Already have an account?<Link to='/login'><span className="span">Log In as {userType ? 'Admin' : 'Customer'}</span></Link></p>
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

export default Register;
