import {
  REQUESTING,
  REQUEST_SUCCESSFUL,
  REQUEST_FAIL,
  SAVE_EXPENSE,
  DELETE_ENTRY,
  EDIT_ENTRY,
  SAVE_EDITED,
} from '../actions';

let ID_COUNT = 0;

const generateID = () => {
  const currentID = ID_COUNT;
  ID_COUNT += 1;

  return currentID;
};

const edit = (state, data, id) => {
  const idToEdit = state.findIndex((expense) => expense.id === id);
  const first = state.slice(0, idToEdit);
  const second = state.slice(idToEdit + 1);
  const newExpense = {
    id: idToEdit,
    value: data.value,
    description: data.description,
    tag: data.tag,
    currency: data.currency,
    method: data.method,
    exchangeRates: data.exchangeRates,
  };

  return [...first, newExpense, ...second];
};

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  requesting: false,
  error: false,
  editMode: false,
  editData: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUESTING:
    return {
      ...state,
      currencies: { ...state.currencies },
      expenses: [...state.expenses],
      requesting: true,
    };
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      currencies: { ...action.data },
      expenses: [...state.expenses],
      error: false,
      requesting: false,
    };
  case REQUEST_FAIL:
    return {
      ...state,
      currencies: { ...state.currencies },
      expenses: [...state.expenses],
      requesting: false,
      error: true,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      currencies: { ...state.currencies },
      expenses: [
        ...state.expenses,
        { ...action.expense, id: generateID() },
      ],
    };
  case DELETE_ENTRY:
    return {
      ...state,
      currencies: { ...state.currencies },
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.id),
      ],
    };
  case EDIT_ENTRY:
    return {
      ...state,
      currencies: { ...state.currencies },
      expenses: [...state.expenses],
      editMode: true,
      editData: { ...state.expenses.find((expense) => expense.id === action.id) },
    };
  case SAVE_EDITED:
    return {
      ...state,
      currencies: { ...state.currencies },
      expenses: edit(state.expenses, action.data, action.id),
      editMode: false,
      editData: {},
    };
  default:
    return state;
  }
};

export default walletReducer;
