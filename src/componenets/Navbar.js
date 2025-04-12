import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {

  return (
    <nav style={{display:"flex",justifyContent:"space-between",
    alignItems:"center",width:"100%",height:"80px",margin:"0 auto",
    padding:"10px 10px",backgroundColor:"Black"}}>
        <Link to="/">Products Store 🛒 </Link>
        <Link to="/create">
           <button>+</button>
        </Link>
      </nav>
  )
}

export default Navbar
