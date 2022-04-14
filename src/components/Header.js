import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import money from '../assets/money.svg';
import './Header.css';

class Header extends React.Component {
  render() {
    const { currentEmail, expenses } = this.props;
    // console.log(this.props);
    const valueExpenses = expenses.map((el) => {
      const { currency } = el;
      const price = el.exchangeRates[currency].ask;
      const newValue = el.value * price;
      return newValue;
      // return console.log(el);
    });

    const sum = valueExpenses.reduce((acc, cur) => acc + cur, 0);

    return (
      <header className="header-wallet">
        <div data-testid="total-field">{`💲: ${sum.toFixed(2)}`}</div>
        <div data-testid="header-currency-field">🪙: BRL</div>
        <div data-testid="email-field">{`👤: ${currentEmail}`}</div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  currentEmail: store.user.email,
  expenses: store.wallet.expenses,
});

Header.propTypes = {
  currentEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
