import React, { useState, useContext,useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import './navbar.css';
import GlobalContext from '../../Context/GlobalContext';



const Navbar = () => {

    var logIned=localStorage.getItem("token");
    const {isLoggedIn, setIsLoggedIn,userType,setUserType} = useContext(GlobalContext);
    const [reload,setReload]=useState(0);
   
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const Logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        setIsLoggedIn(false);

        toast.success('Logged Out 👋');
        setMenuOpen(false); 
        setTimeout(() => {
            setReload(reload+1);
        }, 10);
        
    }

    useEffect (()=>{
       
    },[reload])

    return (
        <nav>
            <div className="nav">
                <Link to='/'>
                    <div className="logo">
                       
                    </div>
                </Link>
                <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className={`links-and-buttons ${menuOpen ? 'open' : ''}`}>
                    
                    <div className="auth-section">

                        {!(logIned) &&
                            <>
                                <Link to='/login' onClick={() => { setUserType(false); setMenuOpen(false); }}>
                                    <button>Customer Login</button>
                                </Link>
                                <Link to='/login' onClick={() => { setUserType(true); setMenuOpen(false); }}>
                                    <button>Admin Login</button>
                                </Link>
                            </>
                        }

                        {(logIned) &&
                            <>
                                <Link to='/' onClick={Logout}>
                                    <button>Logout</button>
                                </Link>
                            <div className='open-options'>
                            <Link to={userType ? 'admin/dashboard' : 'cust/dashboard'} >
                                <button>DashBoard</button>
                            </Link>
                       
                            {userType?
                                <></>
                                :
                                <>
                                
                                    <Link to="/cust/reqloan">
                                        <button >Apply for New Loan</button>
                                    </Link>
                                
                                
                                    <Link to="/cust/viewloan">
                                        <button>View All Loans</button>
                                    </Link>
                                
                                </>
                            }
                                </div>   
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
