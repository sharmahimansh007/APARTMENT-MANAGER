import {Routes, Route} from "react-router-dom"

import { Flat } from "../Flats/Flat"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { NavBar } from "../NavBar/NavBar"
import { Residentdetails } from "../ResidentDetails/ResidentDetail"


export const Routers = () => {
    return(
        <>
        <NavBar/>
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/flat" element={ <Flat/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/residentdetails/:id" element={ <Residentdetails/> } />
        </Routes>
        </>
    )
}