import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses, editExpenses } from '../actions';

class ExpensesTable extends React.Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    console.log(expenses);
    return (
      <table className="table">
        <tbody>
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
        </tbody>
        {expenses.map((obj) => (
          <tbody key={ obj.id }>
            <tr>
              <td>{obj.description}</td>
              <td>{obj.tag}</td>
              <td>{obj.method}</td>
              <td>{Number(obj.value).toFixed(2)}</td>
              <td>{obj.exchangeRates[obj.currency].name}</td>
              <td>{Number(obj.exchangeRates[obj.currency].ask).toFixed(2)}</td>
              <td>
                {
                  (Number(
                    obj.exchangeRates[obj.currency].ask,
                  ) * Number(obj.value)).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpense(obj.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenses(id)),
  editExpense: (id) => dispatch(editExpenses(id)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
