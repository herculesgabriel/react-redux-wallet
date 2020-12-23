import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Header = ({ logo, email, expenses }) => {
  const updateTotal = () => {
    const result = expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const currentCurrency = exchangeRates[currency];
      const total = Number(value) * currentCurrency.ask;

      return acc + total;
    }, 0);

    return result.toFixed(2);
  };

  return (
    <header>
      <img src={ logo } alt="logo" width="200" className="logo" />

      <div>
        <p data-testid="email-field">{email}</p>
        <p>
          Despesa Total: R$
          <span data-testid="total-field">{` ${updateTotal()}`}</span>
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  email: PropTypes.string.isRequired,
};
