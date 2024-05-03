import {Outlet} from "react-router-dom";
import Sidebar from "../components/Navbar/sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";

const Layout=()=>{
   const [Sidecontent,setSidecontent]= useState();
    const [effect,setEffect]=useState(0);
   useEffect(()=>{
    if(localStorage.getItem("isAdmin")){
      
      setSidecontent(
        <>
          <Sidebar/>
        </>
      )
      }else if(!localStorage.getItem("isAdmin")){
      
      setSidecontent(
        <>
          <Sidebar/>
        </>
      )
      }else{
      setSidecontent(<></>)
  }

  setTimeout(() => {
    setEffect(effect+1);
  }, 700);
    

   },[effect])
return(
    <>
    

      <Navbar/>
        
        <div className="displayscreen">
           <div classname="sidecontent">{Sidecontent}</div> 
            <Outlet className="outlet"/>
        </div>

    </>
)

}

export default Layout;



