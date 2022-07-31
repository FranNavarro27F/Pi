import React, { useState } from "react";
import { createPokemon } from "../actions";
import { useDispatch } from "react-redux";
import "./styles/Create.css"

export default function Create(){
    let [input, setInput]= useState({
        name:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        img:"",
        type:[]
    });


    let handleSelectChange=(e)=>{
        setInput((prev)=> ({...prev, type:[...prev.type, e.target.value]}))
    }

    // let handleSelectChange=(e)=>{
    //     setInput({
    //         ...input,
    //         type:[...input.type , e.target.value]
    //     })
    // }
    
   
    let handleChange=(e)=>{
        setInput((prev)=> ({...prev, [e.target.name]: e.target.value}))
    } 
    
    let dispatch= useDispatch();
    
    let handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createPokemon(input))

        setInput({
            name:"",
            hp:"",
            attack:"",
            defense:"",
            speed:"",
            height:"",
            weight:"",
            img:"",
            type:[]
        })
    }

    return(
        <div id="fondo-create">
            <div>Create a Pokemon!!!</div>
            <br/>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type={"text"} name={"name"} value={input.name}
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div>
                    <label>HP</label>
                    <input type={"number"} name={"hp"} value={input.hp}
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div>
                    <label>Attack</label>
                    <input type={"number"} name={"attack"} value={input.attack}
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div>
                    <label>Defense</label>
                    <input type={"number"} name={"defense"} value={input.defense}
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div>
                    <label>Speed</label>
                    <input type={"number"} name={"speed"} value={input.speed}
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div>
                    <label>Height</label>
                    <input type={"number"} name={"height"} value={input.height}
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div>
                    <label>Weight</label>
                    <input type={"number"} name={"weight"} value={input.weight}
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div>
                    <label>IMG</label>
                    <input type={"text"} name={"img"} value={input.img}
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div>
                        <label>type</label>
                    <select onChange={(e)=> handleSelectChange(e)}>
                        <option value={1}>normal</option>
                        <option value={2}>fighting</option>
                        <option value={3}>flying</option>
                        <option value={4}>poison</option>
                        <option value={5}>ground</option>
                        <option value={6}>rock</option>
                        <option value={7}>bug</option>
                        <option value={8}>ghost</option>
                        <option value={9}>steel</option>
                        <option value={10}>fire</option>10
                        <option value={11}>water</option>11
                        <option value={12}>grass</option>
                        <option value={13}>electric</option>
                        <option value={14}>psychic</option>
                        <option value={15}>ice</option>
                        <option value={16}>dragon</option>
                        <option value={17}>dark</option>
                        <option value={18}>fairy</option>
                        <option value={10001}>unknown</option>
                        <option value={10002}>shadow</option>
                    </select>
                </div>
                <br/>
                <br/>
               
                <div>
                {/* <input type={"submit"} onClick={(e)=> handleSubmit(e)} >Crear!</input> */}
                <button type="submit">crear!</button>
                </div>
            </form>
        </div>
    )
}
