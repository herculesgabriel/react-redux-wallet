import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Form = (props) => {
  const { value, description, tag, currency, method, requesting, error } = props;
  const { handleChange, readCurrencies, handleSubmit } = props;
  const { editMode } = props;

  return (
    <form className={ editMode ? 'edit-mode' : '' }>
      <input
        type="number"
        id="value"
        name="value"
        placeholder="Valor"
        value={ value }
        onChange={ handleChange }
        data-testid="value-input"
      />

      <input
        type="text"
        id="description"
        name="description"
        placeholder="Descrição"
        value={ description }
        onChange={ handleChange }
        className="description"
        data-testid="description-input"
      />

      <select
        id="currency"
        name="currency"
        value={ currency }
        onChange={ handleChange }
        data-testid="currency-input"
      >
        {
          !requesting && !error && readCurrencies().map(({ code }) => (
            <option key={ code } value={ code } data-testid={ code }>
              { code}
            </option>
          ))
        }
      </select>

      <select
        name="method"
        id="method"
        value={ method }
        placeholder="Método de pagamento"
        onChange={ handleChange }
        data-testid="method-input"
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>

      <select
        name="tag"
        id="tag"
        value={ tag }
        placeholder="Categoria"
        onChange={ handleChange }
        data-testid="tag-input"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Transporte">Transporte</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Saúde">Saúde</option>
      </select>

      <button type="button" onClick={ handleSubmit }>
        { editMode ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    </form>
  );
};

export default Form;

Form.propTypes = {
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  requesting: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  readCurrencies: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
