import React, {useState, useEffect}from 'react'
import {Link, useHistory} from "react-router-dom"
import { AppBar, Toolbar, Typography, Avatar, Button} from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import useStyles from "./styles"
import logo from "../../images/icons8-wallet-96.png"
import { CLEAR } from '../../constants/actionTypes'

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const dispatch = useDispatch();
    const history = useHistory();
    const userState = useSelector(state => state.user)

    const logout = () => {
        dispatch({type: CLEAR})
        setUser(null);
        history.push("/auth")

        
    }

    const login = () => {
        history.push("/auth")
    }


    useEffect(() => {
      if(userState?.name){
          setUser(userState);
      }
    }, [userState])
    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">My Wallet</Typography>
                <img className={classes.image} src={logo} alt="My wallet" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={userState.name}>{user.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button variant="contained" onClick={login} className={classes.button}>Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;