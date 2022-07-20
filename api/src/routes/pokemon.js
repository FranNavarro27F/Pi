const axios= require("axios");
const Router= require("express");
const router = Router();


function EstractorInfoPokemon (dataPoke){
    return {
        name: dataPoke.name,
        img: dataPoke.sprites.other.dream_world.front_default,
        type: dataPoke.types.map(cur => cur.type.name)
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

module.exports={
    getPokemonsApi
}