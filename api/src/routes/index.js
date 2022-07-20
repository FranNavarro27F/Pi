const { Router } = require('express');
const modelsArch= require("./pokemon")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers

// Ejemplo: router.use('/auth', authRouter);


router.get("/pokemons", async (req, res, next)=>{
  const {name}= req.query;
  
  try {
    res.json(await modelsArch.getPokemonsApi(name) )

  } catch (error) {
    
    next (error)
  }
})






module.exports = router;
