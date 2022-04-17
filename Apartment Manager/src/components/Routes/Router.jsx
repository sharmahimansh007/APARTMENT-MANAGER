import {Routes, Route} from "react-router-dom"
import { Home } from "../Home/Home"
import { NavBar } from "../NavBar/NavBar"


export const Routers = () => {
    return(
        <>
        <NavBar/>
        <Routes>
            <Route path="/" element={ <Home/> }/>
        </Routes>
        </>
    )
}