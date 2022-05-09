import React from "react";
import "@testing-library/jest-dom/extend-expect"
import {screen,render, fireEvent} from "@testing-library/react"
import Menu from "./Menu";
import { Provider } from "react-redux";
import { createStore } from "redux";
import usersReducer from "../../reducers/usersReducer";
import userReducer from "../../reducers/userReducer";
import { combineReducers } from "redux";


const reducers = combineReducers({
    users: usersReducer,
    user: userReducer,
})

const initialState = {
    user:{},
    users: []
}

const store = createStore(reducers, initialState);

const Wrapper = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

describe("< Menu />", () =>{
    //let view;

    /* beforeEach(() => {
        view = render(
            <Menu/>, { wrapper: Wrapper}
        )
    }) */

    const setup = () => render( <Menu/>, { wrapper: Wrapper})

    test("renders content get Dashboard", () => {
        setup()
        const button = screen.getByText("Dashboard");
        expect(button).toBeTruthy();
    })

    test("renders content get Transactions", () => {
        setup()
        const button = screen.getByText("Transactions");
        expect(button).toBeTruthy();
    })

    test("renders content get Balance", () => {
        setup()
        const button = screen.getByText("Balance");
        expect(button).toBeTruthy();
    })
})










