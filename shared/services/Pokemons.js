const POKE_API = "https://pokeapi.co/api/v2";

export default class PokemonsService {

    constructor() {

    }

    getPokemons() {
        return fetch(`${POKE_API}/pokemon`).then(res => res.json());
    }

}