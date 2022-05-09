import React, {useState, useEffect, useContext} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import useStyles from "./styles.js"
import { Paper } from '@material-ui/core';
import { MenuContext } from '../../context/components/MenuContext.js';


const Menu = () => {
    const classes = useStyles();
    const {menuItemSelected, changeItemSelected} = useContext(MenuContext);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };


    useEffect(() => {
      changeItemSelected(selectedIndex);
    }, [changeItemSelected,selectedIndex]);

  
    return (
      <div className={classes.root}>
      <Paper className={classes.paper} elevation={6}>
      
        <List component="nav" aria-label="menu">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            className={classes.root}
          >
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            className={classes.root}
          >
            <ListItemIcon>
              <AccountBalanceWalletOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>
        <Divider />
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            className={classes.root}
          >
          <ListItemIcon>
              <MonetizationOnOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Balance" />
          </ListItem>
        </List>
        </Paper>
      </div>
    );
}

export default Menu