import fetch from 'isomorphic-unfetch';
import Cors from 'micro-cors';

const cors = Cors({
    allowedMethods: ['GET', 'PUT', 'POST']
});

const POKE_API = "https://pokeapi.co/api/v2";

const getPokemon = (url) => fetch(url).then(res => res.json());

const getPokemons = async () => {
    const pokemons = await fetch(`${POKE_API}/pokemon`).then(res => res.json()).then(res => res.results);
    return Promise.all( 
        pokemons.map( async pokemon => {
            const pk = await getPokemon(pokemon.url);            
            return { name: pk.name, sprites: pk.sprites, id: pk.id };
        })
    );
}

export default cors(async (req, res) => {    
    let pokemons = await getPokemons();
    res.status(200).json(pokemons);
})