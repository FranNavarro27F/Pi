const { Router } = require('express');
const modelPokemon= require("./pokemon")
const modelTipo= require("./tipo")
const {Pokemon, Tipo}= require("../db")
// const { create} = require('sequelize');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers

// Ejemplo: router.use('/auth', authRouter);


router.get("/pokemons", async (req, res, next)=>{
  const {name}= req.query;
  try {
    res.json(await modelPokemon.getPokemonsApi(name) );
  } catch (error) {
    next (error);
  }
});


router.get("/pokemons/:id", async (req, res, next)=>{
  const {id}= req.params;
  try {
    res.json(await modelPokemon.getPokemonId(id) );
  } catch (error) {
    next (error);
  }
});


router.get("/tipo",async (req, res, next)=>{
  try {
    res.json( await modelTipo.getTipos())
  } catch (error) {
    next(error)
  }
})


router.post("/pokemons", async (req, res, next)=>{
  const {name,img,tipo,hp,attack,defense,speed,height,weight}=req.body;
  try {
    let newPokemonDB= await Pokemon.create({
      name,
      img,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      tipo
    })
    await newPokemonDB.addTipos(tipo)
    console.log("soy el rty")
    res.status(200).send(newPokemonDB)
  } catch (error) {
    console.log("soy el catch")
      next(error);
  }
})




module.exports = router;
