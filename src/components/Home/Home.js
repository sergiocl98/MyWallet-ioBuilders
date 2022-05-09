import React, { useContext } from "react";
import {Container, Grow, Grid} from "@material-ui/core"
import useStyles from "./styles";
import Menu from "../Menu/Menu";
import Transaction from "../Transactions/Transaction";
import Dashboard from "../Dashboard/Dashboard";
import Operations from "../Operations/Operations";
import { MenuContext } from "../../context/components/MenuContext";


const Home = () => {
    const classes = useStyles();
 
    const {menuItemSelected} = useContext(MenuContext);

  return (
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={2} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Menu />
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                           {menuItemSelected === 0 && <Dashboard />}
                           {menuItemSelected === 1 && <Operations />}
                           {menuItemSelected === 2 &&<Transaction />}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
  )
}

export default Home