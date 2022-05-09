import React from "react";
import "@testing-library/jest-dom/extend-expect"
import {screen,render, fireEvent} from "@testing-library/react"
import Operations from "./Operations";
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
    user:{ totalAmount: 1000, name: "Sergio"},
    users: []
}

const store = createStore(reducers, initialState);

const Wrapper = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

describe("< Operations />", () =>{
    //let view;

    /* beforeEach(() => {
        view = render(
            <Operations/>, { wrapper: Wrapper}
        )
    }) */

    const setup = () => render( <Operations/>, { wrapper: Wrapper})

    test("renders content get totalAmount", () => {
        setup()
        const button = screen.getByText("1000");
        expect(button).toBeTruthy();
    })

    test("renders content get button CLEAR", () => {
        setup()
        const button = screen.getByText("Clear");
        expect(button).toBeTruthy();
    })

    test("renders content get button SEND", () => {
        setup()
        const button = screen.getByText("SEND");
        expect(button).toBeTruthy();
    })

})










