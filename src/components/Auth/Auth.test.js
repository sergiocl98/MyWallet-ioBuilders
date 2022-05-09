import React from "react";
import "@testing-library/jest-dom/extend-expect"
import {screen,render, fireEvent} from "@testing-library/react"
import Auth from "./Auth";
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

describe("< Auth />", () =>{
    /* let view;

    beforeEach(() => {
        view = render(
            <Auth/>, { wrapper: Wrapper}
        )
    }) */

    const setup = () => render( <Auth/>, { wrapper: Wrapper})

    test("renders content get Email input", () => {
        setup()
        const input = screen.getByText("Email Address");
        expect(input).toBeTruthy();
    })

    test("renders content get Password input", () => {
        setup()
        const input = screen.getByText("Password");
        expect(input).toBeTruthy();
    })

    test("renders content get register button", () => {
        setup()
        const input = screen.getByText("Don't have an account? Sign Up");
        expect(input).toBeTruthy();
    })
})










