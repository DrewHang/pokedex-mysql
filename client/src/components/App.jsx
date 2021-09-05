import React from 'react'
import axios from 'axios'
import Pokemons from './Pokemons.jsx'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pokemons: [],
      types: []
    }
    this.getPokemons = this.getPokemons.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getTypes = this.getTypes.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getPokemons()
    this.getTypes()

  }

  handleClick() {
    this.getPokemons()
  }

  getPokemons() {
    axios.get('/getAll')
    .then(result => {
      this.setState({pokemons: result.data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  getTypes() {
    axios.get('/type')
    .then(result => {
      this.setState({types: result.data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleChange(e) {
    e.preventDefault()
    // this.setState({type: e.target.value})
    axios.get(`/filter/${e.target.value}`)
    .then(result => {
      this.setState({pokemons: result.data})
    })
    .catch(err => {
      console.log(err);
    })
  }



  render() {
    return (

      <div>
        <h1>Fullstack Pokedex!</h1>
        <button onClick={this.handleClick}>Show All</button>
        <select onChange={this.handleChange} id="types">
          <option>Sort by Type</option>
          {this.state.types.map((type,i) => (
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