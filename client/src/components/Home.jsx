import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterPokemons} from "../actions";
import { Link } from 'react-router-dom';
import "./styles/Home.css";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";


export default function Home() {
    const dispatch= useDispatch();
    const allPokemons= useSelector((state)=> state.pokemons)
   
    const [currentPage, setCurrentPage]= useState(1)
    const [pokemonsPerPage, setpokemonsPerPage]= useState(12)

    const indexOFlastPokemon= currentPage * pokemonsPerPage;

    const indexOfFirstPokemon= indexOFlastPokemon-pokemonsPerPage;
    
    const currentPokemons= allPokemons.slice(indexOfFirstPokemon, indexOFlastPokemon)

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getPokemons());
    },[])

    

    function handleButton(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handeleFiltType(e){
        dispatch(filterPokemons(e.target.value));
    }

   

    return(
        <div id="fondo-home">
        <br/>
            <Link to= "/create">Crear un Pokemon!</Link>
            
            <button onClick={e=> {handleButton(e)}}>
                Recargar Pokemones
            </button>
        <br/>
        <br/>
            <SearchBar/>
        <br/>
            <div>
                    <label>A-Z</label>
                <select>
                    <option value= "asc">Ascendente</option>
                    <option value= "desc">Descendente</option>
                </select>
                    <label>Attack</label>
                <select>
                    <option value= "asc">Ascendente</option>
                    <option value= "desc">Descendente</option>
                </select>
                    <label>type</label>
                <select onChange={(e)=> handeleFiltType(e)}>
                    <option value="All">All</option>
                    <option value="normal">normal</option>
                    <option value="fighting">fighting</option>
                    <option value="flying">flying</option>
                    <option value="poison">poison</option>
                    <option value="ground">ground</option>
                    <option value="rock">rock</option>
                    <option value="bug">bug</option>
                    <option value="ghost">ghost</option>
                    <option value="steel">steel</option>
                    <option value="fire">fire</option>
                    <option value="water">water</option>
                    <option value="grass">grass</option>
                    <option value="electric">electric</option>
                    <option value="psychic">psychic</option>
                    <option value="ice">ice</option>
                    <option value="dragon">dragon</option>
                    <option value="dark">dark</option>
                    <option value="fairy">fairy</option>
                    <option value="unknown">unknown</option>
                    <option value="shadow">shadow</option>
                </select>
                    <label>existing or created</label>
                <select>
                    <option value="all">All</option>
                    <option value="created">Created</option>
                    <option value="api">From API</option>
                </select>
                
            </div>
            <div class="grid">
         { 
            currentPokemons?.map(cur=>{
                return( 
                    <div>
                        <Link to={"/detail"}>
                            <Card key={cur.id}name={cur.name} img={cur.img} type={cur.type}/>
                        </Link>
                    </div>
                    )
                })
            }
            <div id="pag">
                <Paginado 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                    />
            </div>
            </div>

        </div>
    )
}