import { bindActionCreators } from "redux";

 

 const initialState= {
    pokemons:[],
    allPokemons:[]
 }
 
 export default function rootReducer(state= initialState, action){
    
    switch(action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case "CREATE_POKEMON":
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload],
                // pokemons: action.payload,
                // allPokemons: [...state.allPokemons, action.payload]
                // pokemons: state.pokemons.concat(action.payload)
            }
        case "FILTER_TYPE":
            const allPokemons= state.allPokemons;
            const filtradosByTipos= action.payload === "All" ? allPokemons : allPokemons.filter(cur=> cur.type.includes(action.payload))
            return{
                ...state,
                pokemons:filtradosByTipos
            }
        case "FIND_NAME":
            return{
                ...state,
                pokemons:[action.payload.data]

            }
        default:
        return state;
    }

}