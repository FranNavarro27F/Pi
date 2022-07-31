import react from "react";
import "./styles/Paginado.css";

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers=[]

    for(let i=0; i<= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <>
        <nav>
            <ul className="paginado">
                {pageNumbers &&
                pageNumbers.map(number=>(
                    <li key={number} className="number">
                        <button onClick={()=> paginado(number)} > {number} </button>
                    </li>
                   ) 
                   
                )
                }
            </ul>
        </nav>
        </>
    )
}