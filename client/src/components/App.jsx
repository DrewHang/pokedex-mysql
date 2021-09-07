import React from 'react';
import axios from 'axios';
import Pokemons from './Pokemons.jsx'

class App extends React.Component{

  constructor() {
    super()
    this.state = {
      pokemons: [],
      types: []
    }
    this.getPokemons = this.getPokemons.bind(this)
    this.getTypes = this.getTypes.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.getPokemons()
    this.getTypes()
  }

  getPokemons() {
    axios.get('/pokemons')
    .then(result => {
      this.setState({pokemons: result.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  getTypes() {
    axios.get('/types')
    .then(result => {
      this.setState({types: result.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleChange(e) {
    e.preventDefault();
    axios.get(`/pokemons/${e.target.value}`)
    .then(result => {
      this.setState({pokemons: result.data})
    })
    .catch(err => {
      console.log(err)
    })
  }


  render() {
    return (
      <div>
        <h1>Fullstack Pokedex!</h1>
        <button onClick={this.getPokemons}>Show All</button>
        <select id="types" onChange={this.handleChange}>
          <option>Sort by Type</option>
          {this.state.types.map((type, i) => (
            <option key={i} value={type.type}>{type.type}</option>
          ))}
        </select>
        <div>
         <Pokemons getPokemons={this.getPokemons} pokemons={this.state.pokemons} />
        </div>
      </div>
    )

  }
}

export default App;

