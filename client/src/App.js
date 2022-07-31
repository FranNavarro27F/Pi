
import React from "react";
import {Route} from "react-router-dom";
import Home from "./components/Home.jsx";
import Landing from './components/Landing.jsx';
import Detali from "./components/Detail.jsx";
import Create from "./components/CreatePoke.jsx";
import NavBar from "./components/NavBar.jsx";


export default function App() {
  return (
    <>
     
      
          <Route exact path={"/"} component={Landing} />
          <Route path={"/home"} component={NavBar} />
          <Route path={"/home"} render={()=> <Home name={"fran"}/>} />
          <Route path={"/create"} component={NavBar} />
          <Route path={"/detail"} component={Detali} />
          <Route path={"/create"} component={Create} />
      

    </>
  );
}


