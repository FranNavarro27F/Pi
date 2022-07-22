const axios= require("axios");
const Router= require("express");
const { Pokemon, Tipo} = require("../db");
const router = Router();


//busca entre la DB todos los Tipos
//si no hay los trae de la API y agrega un registro por cada tipo existente(con ID y name)
//termina retornando los tipos
async function getTipos() {
    let tiposDb = await Tipo.findAll();
    //me fijo si tengo algo
    if (tiposDb.length === 0) {
      let urls = [];

      const{ data } = await axios.get("https://pokeapi.co/api/v2/type/");
      data.results.forEach((ele) => urls.push(ele.url));
     
      for (let i = 0; i < urls.length; i++) {
        let { data } = await axios.get(urls[i]);
        await Tipo.findOrCreate({
          where: {
            id: data.id,
            name: data.name,
          },
        });
      }
      let tipos = await Tipo.findAll();
      console.log("TIPOS TRAIDOS DE API");
      return tipos;
    } else {
      console.log("TIPOS GUARDADOS EN DB");
      return tiposDb;
    }
  }

  module.exports={
    getTipos
  }