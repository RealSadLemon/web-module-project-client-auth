import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    return(
        <div className="nav-bar">
            <h1>FRIENDS DATABASE</h1>
            {props.loggedIn ? '' : <Link to={'/login'}>LOGIN.</Link>}
            <Link to={'/friendlist'}>FRIENDLIST.</Link>
            <Link to='/addfriend'>ADDFRIEND.</Link>
            <Link to='/'>LOGOUT</Link>
        </div>
    )
}

export default NavBar;