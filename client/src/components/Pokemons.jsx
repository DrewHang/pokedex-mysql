import React from 'react';
import PokemonListEntry from './PokemonListEntry.jsx'


const Pokemons = (props) => props.pokemons.map(pokemon => (
  <PokemonListEntry getPokemons={props.getPokemons} key={pokemon.id} pokemon={pokemon} />
))


export default Pokemons