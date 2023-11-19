import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import {FiAlignRight,FiXCircle } from "react-icons/fi";
import "./../style/style.css"


function Navbar() {
  const [isMenu, setisMenu] = useState(false);
  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const toggleClass = () => {
    setisMenu(isMenu === false ? true : false);
    setResponsiveclose(isResponsiveclose === false ? true : false);
};
  
  
  return (
    <header className="flex w-[100%] mt-2 mb-5">
        <div className="w-[100%] px-[15px] mx-auto">
            <div className="grid grid-cols-12 my-auto">
                {/* Add Logo  */}
                <div className="col-start-1">
                    <NavLink exact activeClassName='is-active' to="/">
                        <img src="assets/imbawan.jpg" alt="logo" className="h-[46px] w-auto mx-10 my-3" /> 
                    </NavLink>
                </div>
                <div className="col-start-2 col-span-4">
                    <span className="text-[40px] judul text-[#F3EEEA] py-12">
                        <NavLink exact activeClassName='is-active' to="/">
                            Reverse Image Search
                        </NavLink>
                  
                    </span>
                </div>
                <div className="my-auto col-start-9 text-xl col-span-4">
                    <nav className="main-nav inline" >
                    {/* Responsive Menu Button */}
                    {isResponsiveclose === true ? <> 
                        <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiXCircle />   </span>
                    </> : <> 
                        <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiAlignRight />   </span>
                    </>}
                    <ul className="flex gap-10 flex-end">
                        <li className="menu-item" ><NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/`}> Home </NavLink></li>
                        <li className="menu-item" ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/pages/About`}> About us</NavLink> </li>
                        <li className="menu-item" ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/pages/HowItWork`}> How It Work </NavLink></li>
                        <li className="menu-item" ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/pages/HowToUse`}> How to Use </NavLink> </li>
                    </ul>
                    </nav>     
                </div>   
            </div>
	    </div>
    </header>
    // <div className=" my-2 flex ml-12 navbar">
    //   <img
    //     src="assets/imbawan.jpg"
    //     alt="panutankita"
    //     className="h-[46px] w-auto mx-10 my-3"
    //   />
    //   <div className="">
    //     <span className="text-[40px] text-[#F3EEEA] py-12">
    //       <a href = "/">Reverse Image Search</a>
    //     </span>
    //   </div>
    // </div>
  );
}

export default Navbar;
