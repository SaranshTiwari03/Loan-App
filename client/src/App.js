import { Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Layout from './Pages/Layout';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Log Pages/Log';
import SignUp from './components/Log Pages/reg';
import AdminHome from './components/Users/Admin/Requests';
import CustDashBoard from './components/Users/Customer/CustDashBoard';
import CustReq from './components/Users/Customer/ReqLoan'
import CustView from './components/Users/Customer/ViewLoan';
import PayLoan from './components/Users/Customer/PayLoan';
import Error from './components/Error';



function App() {

   

    return (

        <div className="App">

            <Navbar />

            <Routes>

            <Route  path="/" element={<Layout/>}>
                <Route index element={<Login />} />

                

                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />


                <Route path='/admin/dashboard' element={<AdminHome/>} />


                <Route path='/cust' element={<Outlet/>} >
                    <Route index path='dashboard' element={<CustDashBoard />} />
                    <Route path='reqloan' element={<CustReq />} />
                    <Route path='viewloan' element={<CustView />} />
                    <Route path='viewloan/payloan/:id' element={<PayLoan />} />
                </Route>

                <Route path='*' element={<Error />} />
             </Route>

            </Routes>


        </div>
    );
}

export default App;
