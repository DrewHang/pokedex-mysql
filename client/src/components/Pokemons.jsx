import React from 'react';
import PokemonEntry from './PokemonEntry.jsx';


const Pokemons = (props) => {

  return (
    <div>
      {props.pokemons.map(pokemon =>
        <PokemonEntry getPokemons={props.getPokemons} key={pokemon.id} pokemon={pokemon} />
      )}
    </div>

  )


}

export default Pokemons