import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const delay = response => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(response), 2000)
  })
};

class App extends Component {
  state = {
    zip: null,
  };

  componentDidMount() {
    // axios.get('/ip').then(response => {
    //   return axios.get('/location?ip=' + response.data.ip).then(r2 => {
    //     const { lat, lon } = r2.data;
    //     return axios.get(`/zip?lat=${lat}&lon=${lon}`).then(r3 => {
    //       const { zip } = r3.data;
    //       this.setState(state => ({ zip }));
    //     });
    //   });
    const promise = axios.get('/ip')
      .then(response => {
        return axios.get('/location?ip=' + response.data.ip)
      })
    promise
      .then(delay)
      .then(response => {
        const { lat, lon } = response.data
        return axios.get(`/zip?lat=${lat}&lon=${lon}`)
      })
      .then(delay)
      .then(response => {
        const { zip } = response.data;
        this.setState(state => ({ zip }));
      })
      .catch(error => {
        console.log('error', error)
        this.setState(state => ({ zip: 'Oh no!' }))
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
