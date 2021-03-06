import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fecthApiThunk } from '../actions';
import Form from '../components/Form';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';
import './Wallet.css'

class Wallet extends React.Component {
  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
  }

  render() {
    return (
        <main className="main-wallet">
          <Header />
            <div className='form-container'>
              <Form />
            </div>
            <div className="table-container">
              <ExpensesTable />
            </div>
        </main>
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
