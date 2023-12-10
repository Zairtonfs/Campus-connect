// LoginForm.js
import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      authResult: null,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    try {
      const response = await fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Atualize o estado com o resultado da autenticação
      this.setState({ authResult: data });
    } catch (error) {
      console.error('Erro ao autenticar:', error);
    }
  };

  render() {
    const { username, password, authResult } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Usuário:
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Senha:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>

        {authResult && (
          <div>
            <h2>Resultado da Autenticação</h2>
            <p>{authResult.success ? 'Autenticação bem-sucedida!' : 'Falha na autenticação.'}</p>
          </div>
        )}
      </div>
    );
  }
}

export default LoginForm;
