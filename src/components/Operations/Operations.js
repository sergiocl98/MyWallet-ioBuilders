import React, {useState} from 'react';
import { Typography, Paper , Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { GET_MONEY, SEND_MONEY, UPDATE_USER } from '../../constants/actionTypes';
import useStyles from "./styles";
import Euro from '@material-ui/icons/Euro';


const Operations = () => {
  const [amount, setAmount] = useState(1)
  const [userDestiny, setUserDestiny] = useState("")
  const classes = useStyles();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user)
  const usersState = useSelector(state=> state.users);
  const [openOk, setOpenOk] = useState(false);
  const [openKo, setOpenKo] = useState(false);


  const handleChange = (event) => {
    setUserDestiny(event.target.value);
  };

  const handleClick = () => {
      if( userDestiny !== userState.id){
        const nameDestiny = usersState.find(user => user.id === userDestiny)
        dispatch({type: SEND_MONEY, payload: -amount, name: nameDestiny.name, id: userDestiny}) //Send money to another user
        updateStore()
        setOpenOk(true)
      } else {
        setOpenKo(true)
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

  const clear = () => {
      setAmount(1);
      setUserDestiny("")
  }

  const updateStore = () => {
    dispatch({type: UPDATE_USER, payload: -amount, id: userState.id, name: userState.name, operation: "transfer"}) //Update user in users state
    dispatch({type: GET_MONEY, payload: +amount, destinyUser: userDestiny, name: userState.name}) //Update user who receives money
  }

  return (
    <Paper className={classes.paper} elevation={6}> 
      <Typography variant="h5" >Total Amount:</Typography>
      <Box component="span" sx={{ p: 2, borderRadius: 50, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',color: 'white', fontSize: "3rem", display: "flex", justifyContent: "center", alignItems: "center"}}> {userState?.totalAmount} <Euro/></Box>
      <Typography variant="h6">Send Money</Typography>
      <div style={{display: "flex", justifyContent: "space-around", padding: 20}}>
          <TextField type= "number" name="amount" variant='outlined' label="Amount"  value={amount} onChange={(e) => setAmount(e.target.value)}
              InputProps={{
            inputProps: { 
            min: 1 
            }
        }}
          />
          
          <FormControl variant="outlined" style={{minWidth: 200}}>
            <InputLabel id="demo-simple-select-select">User</InputLabel>
            <Select
              labelId="demo-simple-select"
              id="demo-simple-select"
              value={userDestiny}
              label="User"
              onChange={handleChange}
            >
              <MenuItem key="none" value="">
                <em>None</em>
              </MenuItem>
              {usersState?.map(user => {
                return (
                  <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
      </div>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size='large' onClick={handleClick} fullWidth disabled={userDestiny === "" || amount <= 0 || amount > userState.totalAmount}>SEND</Button>
      <Button  variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
      <Snackbar open={openOk} autoHideDuration={4000} onClose={handleCloseOk}>
        <Alert variant="filled" onClose={handleCloseOk} severity="success" sx={{ width: '100%' }}>
          Transfer success!
        </Alert>
      </Snackbar>
      <Snackbar open={openKo} autoHideDuration={4000} onClose={handleCloseKo}>
        <Alert variant="filled" onClose={handleCloseOk} severity="error" sx={{ width: '100%' }}>
          Transfer error!
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default Operations