import { GET_MONEY, GET_USERS, SIGNUP, UPDATE_USER} from "../constants/actionTypes";
import initialState from "../store/initialState";

const usersReducer = (state= initialState.users, action) => {
    const date = new Date().toLocaleString();
    switch(action.type) {
        case GET_USERS:
            return state.users;
        case SIGNUP:
            return [...state, action.user]
        case UPDATE_USER:
            const updatedUsers = 
            state.map(usr => {
                    if(usr.id === action.id){
                        return {
                            id: usr.id,
                            name: usr.name,
                            totalAmount : usr.totalAmount + action.payload,
                            transactions : [{date:date, transactionType: action.operation, amount: action.payload, totalAmount: usr.totalAmount + action.payload, name: action.name}].concat(usr.transactions),
                            email: usr.email,
                            password: usr.password
                        }
                    } else {
                        return usr
                    }
                })
            return [...updatedUsers]
        case GET_MONEY:
            const user = state.find(user => user.id === action.destinyUser )
            user.totalAmount = user.totalAmount + action.payload
            user.transactions = [{date:date, transactionType: "transfer", amount: action.payload, totalAmount: user.totalAmount + action.payload, name: action.name}].concat(user.transactions);
            const usersFiltered = state.filter(user => user.id !== action.destinyUser)
            return [...usersFiltered, user]

        default:
            return state;
    }
};
export default usersReducer;