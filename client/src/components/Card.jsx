import React from "react";
import "./styles/Card.css";

export default function Card({name, img, type}){
    // img===""?img="./img/unknow.png":img=img;

    return (
        <div class="card">
            <h3>{name}</h3>
            <h4>{type}</h4>
            <img src={img} alt="imagen"/>
        </div>
    )
}