import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    
  },
  paper: {
    overflow: "hidden",
    borderRadius: 10,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  menuItem: {
    overflow: "hidden"
  }
  
}));