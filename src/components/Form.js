import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesSuccess, fecthApiThunk } from '../actions';
import fetchCurrencies from '../services/fetchApiCurrencies';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  async submitButton(event) {
    event.preventDefault();
    const exchangeRates = await fetchCurrencies();
    const { statesForm } = this.props;
    const newObject = {
      ...this.state,
      exchangeRates,
    };
    statesForm(newObject);
    this.setState({ value: 0 });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map(
              (el) => <option value={ el } key={ el }>{el}</option>,
            )}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            {methods.map(
              (el) => <option value={ el } key={ el }>{el}</option>,
            )}
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ this.submitButton }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  statesForm: (state) => dispatch(expensesSuccess(state)),
  requestApi: (state) => dispatch(fecthApiThunk(state)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  statesForm: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
