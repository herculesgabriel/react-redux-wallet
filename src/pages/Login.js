import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      email: '',
      password: '',
      allInputsValid: false,
    };
  }

  handleInput(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value }, () => {
      const allInputsValid = this.validateInputs();
      this.setState({ allInputsValid });
    });
  }

  validateInputs() {
    const { email, password } = this.state;
    const minimumLength = 6;

    const validation = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const validEmail = validation.test(email);
    const validPassword = password.length >= minimumLength;

    return validEmail && validPassword;
  }

  login() {
    const { userLogin } = this.props;
    const { email } = this.state;

    userLogin(email);
  }

  render() {
    const { email, password, allInputsValid } = this.state;
    const { userIsLogged } = this.props;

    if (userIsLogged) {
      return <Redirect to="/carteira" />;
    }

    return (
      <div>
        <h1>Acesse sua carteira</h1>

        <form className="form-login">
          <label htmlFor="email">
            Login
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite o seu e-mail"
              value={ email }
              onChange={ this.handleInput }
              data-testid="email-input"
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite a sua senha"
              value={ password }
              onChange={ this.handleInput }
              data-testid="password-input"
            />
          </label>

          <button type="button" disabled={ !allInputsValid } onClick={ this.login }>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userIsLogged: state.user.logged,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(login(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userIsLogged: PropTypes.bool.isRequired,
};
