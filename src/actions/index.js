import fetchCurrencies from '../services/fetchApiCurrencies';

const USER_EMAIL = 'USER_EMAIL';
const REQUEST_CURRENCIES = 'CURRENCIES';
const EXPENSES_FORM = 'EXPENSES_FORM';
const FAIL_REQUEST = 'FAIL_REQUEST';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

const userEmail = ({ email }) => ({
  type: USER_EMAIL,
  email,
});

const currenciesAction = (currencies) => ({
  type: REQUEST_CURRENCIES,
  currencies,
});

const failedAction = (error) => ({
  type: FAIL_REQUEST,
  error,
});

const expensesSuccess = (expenses) => ({
  type: EXPENSES_FORM,
  payload: expenses,
});

const deleteExpenses = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

const editExpenses = () => ({
  type: EDIT_EXPENSE,
});

const fecthApiThunk = () => async (dispatch) => {
  const result = await fetchCurrencies();
  const filterCurrencies = Object.keys(result).filter((obj) => obj !== 'USDT');
  try {
    dispatch(currenciesAction(filterCurrencies));
  } catch (error) {
    dispatch(failedAction(error));
  }
};

export {
  userEmail,
  USER_EMAIL,
  currenciesAction,
  REQUEST_CURRENCIES,
  fecthApiThunk,
  EXPENSES_FORM,
  FAIL_REQUEST,
  expensesSuccess,
  deleteExpenses,
  DELETE_EXPENSE,
  editExpenses,
};
