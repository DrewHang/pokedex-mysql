import React from 'react';
import axios from 'axios';

class PokemonListEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      name: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderEdit = this.renderEdit.bind(this)
    this.updateName = this.updateName.bind(this)
    this.deletePokemon = this.deletePokemon.bind(this)

  }

  handleClick(){
    this.setState({clicked: !this.state.clicked})
  }

  updateName() {
    axios.put(`/update/${this.props.pokemon.id}`, {
      name: this.state.name
    })
    .then(() => {
      this.props.getPokemons()
      this.setState({clicked: false})
    })
    .catch(err => {
      console.log(err)
    })
  }

  deletePokemon() {
    axios.delete(`/pokemons/${this.props.pokemon.id}`)
    .then(() => {
      this.props.getPokemons()
    })
    .catch(err => {
      console.log(err)
    })
  }

  renderEdit(e) {
    if (this.state.clicked) {
      return (
        <div>
          <input onChange={this.handleChange} value={this.state.name}></input><button onClick={this.updateName}>Edit</button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={this.deletePokemon}>Delete</button>
        </div>
      )
    }
  }

  handleChange(e) {
    this.setState({name: e.target.value})
  }


  render() {
    return (
    <div>
      <h3>{this.props.pokemon.name}</h3>
      <img onClick={this.handleClick} src={this.props.pokemon.img} />
      {this.renderEdit()}
    </div>
    )
  }
}


export default PokemonListEntry