import React from "react";
import "@testing-library/jest-dom/extend-expect"
import {screen,render, fireEvent} from "@testing-library/react"
import { Provider } from "react-redux";
import { createStore } from "redux";
import usersReducer from "../../reducers/usersReducer";
import userReducer from "../../reducers/userReducer";
import { combineReducers } from "redux";
import Dashboard from "./Dashboard";


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

describe("< Dashboard />", () =>{
    //let view;

    /* beforeEach(() => {
        view = render(
            <Dashboard/>, { wrapper: Wrapper}
        )
    }) */

    const setup = () => render( <Dashboard/>, { wrapper: Wrapper})

    test("renders content get Operations section", () => {
        setup()
        const title = screen.getByText("Operations");
        expect(title).toBeTruthy();
    })

    test("renders content get Total Amount Section", () => {
        setup()
        const title = screen.getByText("Total Amount:");
        expect(title).toBeTruthy();
    })

    test("renders content get 1000 Total Amount", () => {
        setup()
        const amount = screen.getByText("1000");
        expect(amount).toBeTruthy();
    })

    test("renders content get Last Transactions", () => {
        setup()
        const title = screen.getByText("Last Transactions");
        expect(title).toBeTruthy();
    })

    test("renders content get DEPOSIT button", () => {
        setup()
        const button = screen.getByText("Deposit");
        expect(button).toBeTruthy();
    })

    test("renders content get WITHDRAW button", () => {
        setup()
        const button = screen.getByText("Withdraw");
        expect(button).toBeTruthy();
    })

    test("renders content get Name column", () => {
        setup()
        const column = screen.getByText("Name");
        expect(column).toBeTruthy();
    })

    test("renders content get Type column", () => {
        setup()
        const column = screen.getByText("Type");
        expect(column).toBeTruthy();
    })

    test("renders content get Date column", () => {
        setup()
        const column = screen.getByText("Date");
        expect(column).toBeTruthy();
    })

    test("renders content get Amount column", () => {
        setup()
        const column = screen.getByText("Amount (€)");
        expect(column).toBeTruthy();
    })

    test("renders content get Total Amount column", () => {
        setup()
        const column = screen.getByText("Total Amount (€)");
        expect(column).toBeTruthy();
    })

})










