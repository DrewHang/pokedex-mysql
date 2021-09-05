import React from 'react';
import axios from 'axios';

class PokemonEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      change: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleClick() {
    this.setState({clicked: !this.state.clicked})
  }

  onEdit() {
    if (this.state.clicked) {
      return (
        <div>
          <input onChange={this.handleChange} value={this.state.change} placeholder="Change Name.."></input>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      )
    }
  }

  handleChange(e) {
    this.setState({change: e.target.value})
  }

  onSubmit() {
    axios.put(`/update/${this.props.pokemon.id}`, {
      name: this.state.change
    })
    .then(this.props.getPokemons())
    .then(this.setState({
      clicked: false,
      change: ''
    }))
    .catch(err => {
      console.log(err)
    })
  }

  onDelete() {
    axios.delete(`/delete/${this.props.pokemon.id}`, {
      name: this.state.change
    })
    .then(this.props.getPokemons())
    .catch(err => {
      console.log(err)
    })
  }


  render() {
    return (
      <div>
        <h3>{this.props.pokemon.name}</h3>
        <img onClick={this.handleClick} src={this.props.pokemon.img}></img>
        {this.onEdit()}
        <div>
          <button onClick={this.onDelete}>Delete</button>
        </div>
      </div>
    )
  }
}



export default PokemonEntry