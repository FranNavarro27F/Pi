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
};


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
};


const getPokemonsApi= async ()=> {
     const {data}= await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
     let ArrResults=data.results;
     let promPoke=await Promise.all( ArrResults.map(cur => axios.get(cur.url)) );
     let info40limpia= promPoke.map(cur => cur.data);
     let arrResult=[];
     info40limpia.forEach( cur => arrResult.push( EstractorInfoPokemon(cur) ) )
    //  console.log(arrResult)
     return arrResult;
};


const getPokemonsDb= async ()=> {
    let TodosDeDb = await Pokemon.findAll({
         include: {
         model: Tipo,
         attributes: ["name"],
         through:{
            attributes:[]
         }
        }
    })
    // console.log(TodosDeDb)pokemon y extras

    if(TodosDeDb.length > 0){
        const TodosDeDbMapeados= TodosDeDb.map(cur => cur.dataValues);
        // console.log(TodosDeDbMapeados);
        return TodosDeDbMapeados;
    }
};



const joinDeGets= async (name)=>{
    let api1=await getPokemonsApi();
    let db1=await getPokemonsDb();
   
    let db2= db1.map(cur=> {
        return{
            name: cur.name,
            img: cur.img,
            type: cur.tipos.map(cur=> cur.name)
        }
    })
    let concatenados=api1.concat(db2);
    
    if(name){
        let findName=concatenados.filter(cur=> cur.name.toLowerCase() === name.toLowerCase());
        if(findName.length > 0){
            return findName;
        }else{
            return "El nombre no se encontro";
        }
    }else{
        return concatenados;
    }
};


const getPokemonId = async (id)=>{
    if(id.includes("-")){
        const pokemonPorId=await Pokemon.findByPk(id, {
            includegi:{
                    model: Tipo,
                    attributes: ["name"]
                }
        })
        return pokemonPorId;
    }else{
        const {data}= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return EstractorInfoPokemonToda(data)
    }
};




module.exports={
    getPokemonsApi,
    getPokemonId,
    joinDeGets
}