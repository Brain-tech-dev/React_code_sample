import React from 'react'
import { NavLink } from 'react-router-dom'



export default function SideBarLink({ href, name, icon }) {


  return (
    <>
      <li>
  <NavLink 
    to={href} 
    className={({ isActive, isPending }) =>
      isPending ? "" : isActive ? "active" : ""
    } 
    onClick={() => {
      localStorage.setItem("activeTab2", href === "/contacts" ? "#pills-overview" : href==="/users" ? "#manageapplication" :"#vendorlisttabd");
    }}
  >
    <span  dangerouslySetInnerHTML={{ __html:icon }}></span>
    {name}
  </NavLink>   
</li>

     
    </>
  )
}
