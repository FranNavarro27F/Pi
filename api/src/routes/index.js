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
  let {name}= req.query;
  try {
    res.json(await modelPokemon.joinDeGets(name) );
  } catch (error) {
    next (error);
  }
});



router.get("/pokemons/:id", async (req, res, next)=>{
  let {id}= req.params;
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
  let {name,img,tipo,hp,attack,defense,speed,height,weight}=req.body;
  try {
    name= name.toLowerCase()
    // name= name[0].toLocaleUpperCase()+name.slice(1);

    let newPokemonDB= await Pokemon.create({
      name,
      img,
      hp,
      attack,
      defense,
      speed,
      height,
      weight
    })
    console.log(newPokemonDB)
    await newPokemonDB.addTipos(tipo);
    res.json(newPokemonDB);
  } catch (error) {
      next(error);
  }
})




module.exports = router;
