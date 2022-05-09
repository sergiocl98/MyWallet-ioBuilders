import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  quickSend:{
      display: "flex",
      justifyContent: "space-around",
      padding: 10,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        gap:10
      },
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 10px',
  }
  ,
  buttonDisabled: {
    background: 'gray',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 10px',
  }
}));