import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchData, saveExpense, saveEdited } from '../actions';
import logo from '../assets/images/wallet.svg';

import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readCurrencies = this.readCurrencies.bind(this);

    this.state = {
      value: '',
      description: '',
      tag: 'Alimentação',
      currency: 'USD',
      method: 'Dinheiro',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  componentDidUpdate(prevProp) {
    const { editMode, editData } = this.props;

    if (prevProp !== this.props && editMode) {
      const { value, description, tag, currency, method, exchangeRates } = editData;

      this.setState({
        value,
        description,
        tag,
        currency,
        method,
        exchangeRates,
      });
    }
  }

  readCurrencies() {
    const { currencyData } = this.props;
    const currencyArray = [];

    const values = Object.values(currencyData);
    values.forEach((currency) => currencyArray.push(currency));

    return currencyArray;
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  async handleSubmit() {
    const { editMode, editData, editExpense } = this.props;

    if (editMode) {
      editExpense(this.state, editData.id);
    } else {
      const { getCurrencies, currencyData, save } = this.props;
      await getCurrencies();

      this.setState({ exchangeRates: currencyData }, () => save(this.state));
    }

    this.setState({
      value: '',
      description: '',
      tag: 'Alimentação',
      currency: 'USD',
      method: 'Dinheiro',
      exchangeRates: {},
    });
  }

  render() {
    const { email, requesting, error, expenses, editMode } = this.props;
    const { value, description, tag, currency, method } = this.state;

    return (
      <div className="container">
        <Header logo={ logo } email={ email } expenses={ expenses } />

        <Form
          value={ value }
          description={ description }
          tag={ tag }
          currency={ currency }
          method={ method }
          requesting={ requesting }
          error={ error }
          editMode={ editMode }
          handleChange={ this.handleChange }
          readCurrencies={ this.readCurrencies }
          handleSubmit={ this.handleSubmit }
        />

        <Table expenses={ expenses } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencyData: state.wallet.currencies,
  requesting: state.wallet.requesting,
  error: state.wallet.error,
  expenses: state.wallet.expenses,
  editMode: state.wallet.editMode,
  editData: state.wallet.editData,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchData()),
  save: (expense) => dispatch(saveExpense(expense)),
  editExpense: (expense, id) => dispatch(saveEdited(expense, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.defaultProps = {
  requesting: true,
  error: false,
  editMode: false,
  editData: {},
  currencyData: {},
};

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  requesting: PropTypes.bool,
  error: PropTypes.bool,
  editMode: PropTypes.bool,
  editData: PropTypes.objectOf(PropTypes.any),
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencyData: PropTypes.arrayOf(PropTypes.any),
  getCurrencies: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};
