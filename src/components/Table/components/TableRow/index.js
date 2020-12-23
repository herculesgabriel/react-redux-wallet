import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteEntry, editEntry } from '../../../../actions';

const TableRow = (props) => {
  const { value, description, tag, currency, method, exchangeRates, id } = props;

  const { codein } = exchangeRates[currency];
  const { name } = exchangeRates[currency];
  const { ask } = exchangeRates[currency];
  const roundedPrice = Number(ask).toFixed(2);
  const valueConverted = Number(value);

  const handleDelete = () => props.deleteEntry(id);
  const handleEdit = () => props.editEntry(id);

  return (
    <tr>
      <td>{description}</td>
      <td>{tag}</td>
      <td>{method}</td>
      <td>{value}</td>
      <td>{name}</td>
      <td>{roundedPrice}</td>
      <td>{(valueConverted * ask).toFixed(2)}</td>
      <td>{codein === 'BRL' ? 'Real' : codein}</td>
      <td>
        <button
          className="table_button"
          type="button"
          data-testid="edit-btn"
          onClick={ handleEdit }
        >
          Editar
        </button>
        <button
          className="table_button"
          type="button"
          data-testid="delete-btn"
          onClick={ handleDelete }
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteEntry: (id) => dispatch(deleteEntry(id)),
  editEntry: (id) => dispatch(editEntry(id)),
});

TableRow.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(TableRow);
