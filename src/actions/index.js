import currencyAPI from '../services/currencyAPI';

export const LOGIN = 'LOGIN';

export const DELETE_ENTRY = 'DELETE_ENTRY';
export const EDIT_ENTRY = 'EDIT_ENTRY';
export const SAVE_EDITED = 'SAVE_EDITED';

export const REQUESTING = 'REQUESTING';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const login = (email) => ({ type: LOGIN, email });

export const deleteEntry = (id) => ({ type: DELETE_ENTRY, id });
export const editEntry = (id) => ({ type: EDIT_ENTRY, id });
export const saveEdited = (data, id) => ({ type: SAVE_EDITED, data, id });

const requesting = () => ({ type: REQUESTING });
const requestSuccessful = (data) => ({ type: REQUEST_SUCCESSFUL, data });
const requestFail = () => ({ type: REQUEST_FAIL });

export const fetchData = () => (
  async (dispatch) => {
    dispatch(requesting());
    try {
      const response = await currencyAPI();

      delete response.USDT;
      dispatch(requestSuccessful(response));
    } catch (error) {
      console.log(error);
      requestFail();
    }
  }
);

export const saveExpense = (expense) => ({ type: SAVE_EXPENSE, expense });
