import React from 'react';
import { Link,Outlet } from 'react-router-dom';
import './customer.css';


const CustHome = () => {
  return (
    <div className="customer-dashboard">

      <h2 className="dashboard-heading">
        Customer Dashboard</h2>

      <div className="cust-btn-cntnr" >

        <Link to="/cust/reqloan">
          <button className="dashboard-button"><div className='image-loan'></div><h4>Apply for New Loan</h4></button>
        </Link>

        <Link to="/cust/viewloan">
          <button className="dashboard-button"><div className='image-loan1' ></div><h4>View All Loans</h4></button>
        </Link>
      </div>
   
    </div>
  );
};

export default CustHome;
