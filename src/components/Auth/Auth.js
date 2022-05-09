import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Snackbar} from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input'
import { Alert } from '@material-ui/lab'

import useStyles from "./styles"
import { SIGNUP, SIGNIN } from '../../constants/actionTypes'

const initialState= { firstName: "", lastName: "" , email: "" , password: "", confirmPassword: "",}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [openOk, setOpenOk] = useState(false);
    const [openKo, setOpenKo] = useState(false);
    const [openKoSignIn, setOpenKoSignIn] = useState(false);
    

    const users = useSelector(state => state.users);

    const dispatch = useDispatch();
    const history = useHistory();


    const handleSubmit = (e) =>{
        e.preventDefault()

        if(isSignup) {

            if(users){
               const registeredUser = users.find(user => user.email === formData.email)
               if(registeredUser){
                    setOpenKo(true)
                    return;
               }
            }
            if(formData.password !== formData.confirmPassword){
                console.log("Las contraseñas no coinciden.")
                setOpenKo(true)
                return
            }
            const user = {
                id: uuidv4(),
                name: formData.firstName + " " + formData.lastName,
                email: formData.email,
                password: formData.password,
                transactions: [],
                totalAmount: 0,
            }

            dispatch({type: SIGNUP, user})
            dispatch({type: SIGNIN, payload:user})
            localStorage.setItem("profile",JSON.stringify(user))
            history.push("/home");
        } else {
            const registered = users.find(usr => usr.email === formData.email)
        
            if(registered){
                if(registered.password === formData.password){
                    localStorage.setItem("profile",JSON.stringify(registered))
                    dispatch({type: SIGNIN, payload:registered})
                    history.push("/home");
                } else {
                    console.log("La contraseña es incorrecta")
                    setOpenKoSignIn(true)
                }
            } else {
                console.log("El email no existe")
                setOpenKoSignIn(true)
            }
            
            
        }
    }

    const handleCloseOk = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenOk(false);
      };
    
    const handleCloseKo = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenKo(false);
      };

      const handleCloseKoSignIn = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenKoSignIn(false);
      };

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () =>{
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }


  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? "Sign Up" : "Sing In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange}  half/>
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? "Sign Up" : "Sign In"}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>  
        <Snackbar open={openOk} autoHideDuration={4000} onClose={handleCloseOk}>
            <Alert variant="filled" onClose={handleCloseOk} severity="success" sx={{ width: '100%' }}>
            Registration success!
            </Alert>
        </Snackbar>
        <Snackbar open={openKo} autoHideDuration={4000} onClose={handleCloseKo}>
            <Alert variant="filled" onClose={handleCloseOk} severity="error" sx={{ width: '100%' }}>
            Registration error. This email already exists or passwords aren't equals.
            </Alert>
        </Snackbar>  
        <Snackbar open={openKoSignIn} autoHideDuration={4000} onClose={handleCloseKoSignIn}>
            <Alert variant="filled" onClose={handleCloseKoSignIn} severity="error" sx={{ width: '100%' }}>
                Email or password incorrect.
            </Alert>
        </Snackbar>  
    </Container>
  )
}

export default Auth