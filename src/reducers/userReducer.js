import { SIGNIN, DEPOSIT, WITHDRAW, SEND_MONEY, CLEAR} from "../constants/actionTypes";
import initialState from "../store/initialState";

const userReducer = (state= initialState.user, action) => {

    const date = new Date().toLocaleString();
    switch(action.type) {
        case SIGNIN:
            return action.payload;
            case DEPOSIT:
                return {
                    ...state, 
                    totalAmount: state.totalAmount + action.payload,
                    transactions: [{date:date, transactionType: "deposit", amount: action.payload, totalAmount: state.totalAmount + action.payload, name: action.name}].concat(state.transactions)
                };
            case WITHDRAW:
                return {
                    ...state, 
                    totalAmount: state.totalAmount + action.payload,
                    transactions: [{date:date, transactionType: "withdraw", amount: action.payload, totalAmount: state.totalAmount + action.payload, name: action.name}].concat(state.transactions)
                };
            case SEND_MONEY:
                return {
                    ...state, 
                    totalAmount: state.totalAmount + action.payload,
                    transactions: [{date:date, transactionType: "transfer", amount: action.payload, totalAmount: state.totalAmount + action.payload, name: action.name}].concat(state.transactions)
                };
            case CLEAR:
                localStorage.removeItem("profile")
                return {}
        default:
            return state;
    }
};
export default userReducer;