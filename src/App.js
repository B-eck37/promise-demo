import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    zip: null,
  };

  componentDidMount() {
    axios.get('/ip').then(response => {
      axios.get('/location?ip=' + response.data.ip).then(r2 => {
        const { lat, lon } = r2.data;
        axios.get(`/zip?lat=${lat}&lon=${lon}`).then(r3 => {
          const { zip } = r3.data;
          this.setState(state => ({ zip }));
        });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Your zip code is: <strong>{this.state.zip}</strong>
        </p>
      </div>
    );
  }
}

export default App;
