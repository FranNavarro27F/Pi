const axios= require("axios");
const Router= require("express");
const {Pokemon, Tipo} = require("../db");
const router = Router();


function EstractorInfoPokemon (dataPoke){
    return {
        name: dataPoke.name,
        img: dataPoke.sprites.other.dream_world.front_default,
        type: dataPoke.types.map(cur => cur.type.name)
    }
}

function EstractorInfoPokemonToda (dataPoke){
    return{
        name: dataPoke.name,
        img: dataPoke.sprites.other.dream_world.front_default,
        type: dataPoke.types.map(cur => cur.type.name),
        id: dataPoke.id,
        hp: dataPoke.stats[0].base_stat,
        attak: dataPoke.stats[1].base_stat,
        defenese: dataPoke.stats[2].base_stat,
        speed: dataPoke.stats[5].base_stat,
        height: dataPoke.height,
        weight: dataPoke.weight,
    }
}



let getPokemonsApi= async (name)=> {

     if(name){
        const {data}= await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        return EstractorInfoPokemon(data);
     }

     const {data}= await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
     let ArrResults=data.results;
        
     let promPoke=await Promise.all( ArrResults.map(cur => axios.get(cur.url)) )

     let info40limpia= promPoke.map(cur => cur.data) 
        
     let arrResult=[]

     info40limpia.forEach( cur => arrResult.push( EstractorInfoPokemon(cur) ) )
        // console.log(arrResult)
     return arrResult;
}

let getPokemonId = async (id)=>{
    if(id.includes("-")){
        const pokemonPorId=await Pokemon.findByPk(id, {
            includes:{
                    model: Tipo,
                    attributes: ["name"]
                }
        })
        return pokemonPorId;
    }else{
        const {data}= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return EstractorInfoPokemonToda(data)
    }
}




module.exports={
    getPokemonsApi,
    getPokemonId
}