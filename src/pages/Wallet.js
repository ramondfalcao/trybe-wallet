import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fecthApiThunk } from '../actions';
import Form from '../components/Form';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
  }

  render() {
    return (
      <>
        <Header />
        <Form />
        <ExpensesTable />
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(fecthApiThunk()),
});

Wallet.propTypes = {
  requestApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
