import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userEmail } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  submitButton(event) {
    event.preventDefault();
    const { successfulLogin, history } = this.props;
    successfulLogin(this.state);
    this.setState({ disable: true });
    history.push('/carteira');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateInputs);
  }

  validateInputs() {
    // Peguei esse Regex desse site https://www.w3resource.com/javascript/form/email-validation.php
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { password, email } = this.state;
    const minLength = 6;

    if (password.length >= minLength && emailRegex.test(email)) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  render() {
    const {
      disable,
      email,
      password,
    } = this.state;
    return (
      <form>
        <input
          data-testid="email-input"
          placeholder="email@trybe.com"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          name="password"
          data-testid="password-input"
          placeholder="************"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ disable }
          onClick={ this.submitButton }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  successfulLogin: (state) => dispatch(userEmail(state)),
});

Login.propTypes = {
  successfulLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
