import axios from "axios";


export function getPokemons(){
    return async function(dispatch){
        let json= await axios.get("http://localhost:3001/pokemons") 
        return dispatch({
            type:"GET_POKEMONS",
            payload:json.data
        })
    }
}

export function createPokemon(info){
    return async function(dispatch){
        let pokemonCreado= await axios.post("http://localhost:3001/pokemons", {
            name: info.name,
            img: info.img,
            type: info.type,
            hp: info.hp,
            attack: info.attack,
            defense: info.defense,
            speed: info.speed,
            height: info.height,
            weight: info.weight
        })
        return dispatch({
            type:"CREATE_POKEMON",
            payload: pokemonCreado.data
        })
    }  
}

export function filterPokemons(payload){
    return {
        type: "FILTER_TYPE",
        payload: payload
    }
}

 export function findByName(name){
    return async function(dispatch){
        let pokeName= await axios.get(`http://localhost:3001/pokemons?name=${name}`)

       return dispatch({
            type:"FIND_NAME",
            payload: pokeName
       })
    }
 }