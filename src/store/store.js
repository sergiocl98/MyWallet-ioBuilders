import {combineReducers, createStore} from "redux"
import usersReducer from "../reducers/usersReducer";
import userReducer from "../reducers/userReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const reducers = combineReducers({
    users: usersReducer,
    user: userReducer,
})

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(pReducer, composeWithDevTools());
export const persistor = persistStore(store)