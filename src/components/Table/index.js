import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

import TableRow from './components/TableRow';

const Table = ({ expenses }) => (
  <table>
    <thead>
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    </thead>
    <tbody>
      {
        expenses.map((expense) => <TableRow key={ expense.id } { ...expense } />)
      }
    </tbody>
  </table>
);

export default Table;

Table.propTypes = { expenses: PropTypes.arrayOf(PropTypes.object).isRequired };
