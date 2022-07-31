import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { findByName } from "../actions/index";

export default function SearchBar(){
    const dispatch= useDispatch();
    const [input, setInput]=useState("")

    let handleFindNameInput=(e)=>{
        setInput(e.target.value)
     }

    function handleNameSubmit(e){
        e.preventDefault();
        dispatch(findByName(input))
        setInput("")
    }

    return(
    <div>  
        <label>Encontrar por nombre:</label>
        <input type="text" placeholder="ej: bulbasaur"
        onChange={(e)=> handleFindNameInput(e) }
        />
        <button type="submit" onClick={(e)=> handleNameSubmit(e)}>🔎</button>
    </div>
    )
}
