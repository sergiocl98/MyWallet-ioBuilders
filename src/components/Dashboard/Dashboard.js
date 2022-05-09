import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Container,Grid, Paper, TextField, Button, Typography, Box, Snackbar} from "@material-ui/core"

import { Alert } from "@material-ui/lab";
import useStyles from "./styles";
import BasicTable from "../TransactionsTable/TransactionTable";
import Euro from '@material-ui/icons/Euro';
import { DEPOSIT, UPDATE_USER, WITHDRAW } from "../../constants/actionTypes";


const Dashboard = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const userState = useSelector(state => state.user)
    const [amount, setAmount] = useState(1)
    const dispatch = useDispatch();

    const [openOk, setOpenOk] = useState(false);
    const [openKo, setOpenKo] = useState(false);

    const deposit = (amount) => {
        dispatch({type: DEPOSIT, payload: +amount, name: user.name})
        dispatch({type: UPDATE_USER, payload: +amount, id: user.id, operation:"deposit",name: user.name})
        setOpenOk(true)
    }
    const withdraw = (amount) => {
        if(amount > userState.totalAmount){
            setOpenKo(true);
        } else {
            dispatch({type: WITHDRAW, payload: -amount, name: user.name})
            dispatch({type: UPDATE_USER, payload: -amount, id: user.id, operation:"withdraw",name: user.name})
            setOpenOk(true)

        }
    }

    const handleChange = (e) => {
        setAmount(e.target.value);
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
  return (
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Paper elevation={6} style={{padding: 10, minHeight:"180px"}}>
                                <Typography variant="h5" >Operations</Typography>
                                <div className={classes.quickSend}>
                                <TextField type= "number" name="amount" variant='outlined' label="Amount" fullWidth value={amount} 
                                InputProps={{
                                    inputProps: { 
                                    min: 1 
                                    }
                                }}
                                onChange={(e) => handleChange(e)} onFocus={() => setAmount("")}/>
                                </div>
                                <div style={{display: "flex", justifyContent: "space-around"}}>
                                    <Button variant="contained" className={amount <= 0 ? classes.buttonDisabled : classes.button} disabled={amount <= 0} onClick={() => deposit(amount)}>Deposit</Button>
                                    <Button variant="contained" className={amount <= 0 ? classes.buttonDisabled : classes.button} disabled={amount <= 0} onClick={() => withdraw(amount)}>Withdraw</Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Paper elevation={6} style={{padding: 10, minHeight:"180px", display: "flex", flexDirection: "column", gap: 10}}>
                                <Typography variant="h5" >Total Amount:</Typography>
                                <Box component="span" sx={{ p: 2, borderRadius: 50, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',color: 'white', fontSize: "3rem", display: "flex", justifyContent: "center", alignItems: "center"}}> {userState?.totalAmount} <Euro/></Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Paper elevation={6}>
                                <Typography variant="h5" style={{padding: 10}}>Last Transactions</Typography>
                                <BasicTable rows={userState?.transactions ? userState?.transactions : []} limit={3}/>

                            </Paper>
                        </Grid>
                    </Grid>
                    <Snackbar open={openOk} autoHideDuration={4000} onClose={handleCloseOk}>
                        <Alert variant="filled" onClose={handleCloseOk} severity="success" sx={{ width: '100%' }}>
                        Operation success!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openKo} autoHideDuration={4000} onClose={handleCloseKo}>
                        <Alert variant="filled" onClose={handleCloseOk} severity="error" sx={{ width: '100%' }}>
                        Operation error!
                        </Alert>
                    </Snackbar>
                </Container>
  )
}

export default Dashboard