import React from "react";
import { NavLink }from "react-router-dom";
import "./styles/NavBar.css"

export default function NavBar(){
    return(
        <>
            <nav id="nav">
                <ul>
                    <li>
                        <NavLink to={"/home"}>home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/create"}>create</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}