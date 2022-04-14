// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCIES, EXPENSES_FORM, DELETE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

let id = 0;

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case EXPENSES_FORM:
    id = state.expenses.length;
    return {
      ...state,
      expenses: [...state.expenses, { id, ...action.payload }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((el) => el.id !== action.id),
    };
  default:
    return state;
  }
};

export default walletReducer;
