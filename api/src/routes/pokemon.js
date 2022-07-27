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

// const getPokemonsDb= async ()=> {
//     let TodosDeDb = await Pokemon.findAll({
//          include: {
//          model: Tipo,
//          attributes: ["name"],
//          through:{
//             attributes:[]
//          }
//         }
//     })

const getAllPokemons=async()=>{
    let petiBd= await Pokemon.findAll({
        include: {
            model: Tipo,
            attributes: ["name"],
            through:{
                attributes:[]
            }
        }
    })
    let petiBdFilt= petiBd.map(cur=>{
        return {
            name: cur.dataValues.name,
            img:cur.dataValues.img,
            type: cur.dataValues.tipos.map(cur=> cur.name)
        }
    })
    
    /////////////

    let{data}= await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
    let urls= data.results.map(cur=> cur.url);
    let arrPokes=[];
   
    for(let i=0; i< urls.length;i++){
        let{data}=await axios.get(urls[i])
        arrPokes.push({
            name: data.name,
            img: data.sprites.other.dream_world.front_default,
            type: data.types.map(cur=> cur.type.name)
        })
    }
  
   let concatenados=arrPokes.concat(petiBdFilt)
    return concatenados; 
}


const findName=async(name)=>{
   const nameBd= await Pokemon.findAll({
        where: {
            name: name
        },
        include: {
            model: Tipo,// ojo aca
            attributes: ["name"],
            through:{
                attributes:[]
            }
        }
   })
   
   if(nameBd.length > 0){
    let  pokeBd= {
        name:nameBd[0].dataValues.name,
        img:nameBd[0].dataValues.img,
        type:nameBd[0].dataValues.tipos.map(cur=> cur.name)
      }
      console.log(pokeBd)
      return pokeBd;
   }else{
    let petApi= await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let pokeApi={
        name:petApi.data.name,
        img:petApi.data.sprites.other.dream_world.front_default,
        type:petApi.data.types.map(cur=> cur.type.name)
    }
    return pokeApi;
   }
}



const getPokemonId = async (id)=>{
    if(id.includes("-")){
        let pokemonPorId=await Pokemon.findByPk(id, {
            include:{
                    model: Tipo,
                    attributes: ["name"]
                }
        })
        let fTipos={
           
                name:pokemonPorId.name,
                img:pokemonPorId.img,
                hp:pokemonPorId.hp,
                attack:pokemonPorId.attack,
                defense:pokemonPorId.defense,
                speed: pokemonPorId.speed,
                height:pokemonPorId.height,
                weight:pokemonPorId.weight,
                type:pokemonPorId.tipos.map(cur=> cur.name)
                
        }
        return fTipos;
    }else{
        const {data}= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return EstractorInfoPokemonToda(data)
    }
};




module.exports={
    findName,
    getAllPokemons,
    getPokemonId,
    
}