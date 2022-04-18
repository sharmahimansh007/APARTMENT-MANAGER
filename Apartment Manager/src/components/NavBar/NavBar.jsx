import { Link } from "react-router-dom";
import { logoutReq } from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react"

export function NavBar() {

  // const islogedIn = useSelector(state => state) 

  // const navigate = useNavigate();

  // const dispatch = useDispatch();
  const [islogin, setIsLogin] = useState(false)

  const handleLogOut = (task) => {
    if(task == "Logout"){
      dispatch(logoutReq());
      navigate("/login")
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"} style={{textDecoration:"none", color:"white"}}>

            Apartment Manager
            </Link> 
          
           <Link to={"/flat"} style={{marginLeft:"20px", textDecoration:"none", color:"white"}}>
             Flat
            </Link> 
          </Typography>
         <Link to={"/login"} style={{textDecoration:"none", color:"white"}}>
         <Button color="inherit">{islogin ? "Logout" : "Login"}</Button>
         </Link> 
        </Toolbar>
      </AppBar>
    </Box>
  );
}
