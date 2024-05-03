import React, { useState, useContext,useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import GlobalContext from '../../Context/GlobalContext';



const Sidebar= () => {
    const IsAdmin=localStorage.getItem("isAdmin")
    const logIned=localStorage.getItem("token");
    const {isLoggedIn, setIsLoggedIn,userType,setUserType} = useContext(GlobalContext);
    
    return (
      <>
            
            {(logIned) &&
            <div className="sidebar">
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <img src="../../../Images/dashboard@2x.png" width="180px" alt="Logo" />
                    </div>
                    <ul className="sidebar-menu">
                
                        <li>
                            <Link to={userType ? 'admin/dashboard' : 'cust/dashboard'} >
                                <button>DashBoard</button>
                            </Link>
                        </li>
                            {userType?
                                <></>
                                :
                                <>
                                <li>
                                    <Link to="/cust/reqloan">
                                        <button >Apply for New Loan</button>
                                    </Link>
                                </li> 
                                <li>
                                    <Link to="/cust/viewloan">
                                        <button>View All Loans</button>
                                    </Link>
                                </li>
                                </>
                            }
                        
                    </ul>
                    
                </div>
            </div>
            }
        </>
    );
};

export default Sidebar;
