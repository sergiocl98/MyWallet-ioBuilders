import React from "react";
import "@testing-library/jest-dom/extend-expect"
import {screen,render, fireEvent} from "@testing-library/react"
import { Provider } from "react-redux";
import { createStore } from "redux";
import usersReducer from "../../reducers/usersReducer";
import userReducer from "../../reducers/userReducer";
import { combineReducers } from "redux";
import Transaction from "./Transaction";


const reducers = combineReducers({
    users: usersReducer,
    user: userReducer,
})

const initialState = {
    user:{ totalAmount: 1000, name: "Sergio"},
    users: []
}

const store = createStore(reducers, initialState);

const Wrapper = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

describe("< Transaction />", () =>{
    //let view;

    /* beforeEach(() => {
        view = render(
            <Transaction/>, { wrapper: Wrapper}
        )
    }) */

    const setup = () => render( <Transaction/>, { wrapper: Wrapper})

    test("renders content get All tab", () => {
        setup()
        const button = screen.getByText("All");
        expect(button).toBeTruthy();
    })

    test("renders content get Expenses tab", () => {
        setup()
        const button = screen.getByText("Expenses");
        expect(button).toBeTruthy();
    })

    test("renders content get Revenues tab", () => {
        setup()
        const button = screen.getByText("Revenues");
        expect(button).toBeTruthy();
    })

})










