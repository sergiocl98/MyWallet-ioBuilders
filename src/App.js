import React , {useState} from "react";
import {Container} from "@material-ui/core"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { MenuContext } from "./context/components/MenuContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";


const App = () => {
const user = JSON.parse(localStorage.getItem("profile"));
const [menuItemSelected, setMenuItemSelected] = useState(0);

const changeItemSelected = (item) => {
    setMenuItemSelected(item)
}


    return (
        <MenuContext.Provider value={{menuItemSelected,changeItemSelected}}>
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/auth"/>}/>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/auth" exact component={Auth}/>
                </Switch>
            </Container>
        </BrowserRouter>
        </MenuContext.Provider>
    )
}

export default App;