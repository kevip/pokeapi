import fetch from 'isomorphic-unfetch'

const POKE_API = "https://pokeapi.co/api/v2";

const getPokemon = (id) => fetch(`${POKE_API}/pokemon/${id}`).then(res => res.json());

export default async (req, res) => {
    const {
      query: { id, name },
      method
    } = req
  
    switch (method) {
      case 'GET':        
        const pokemon = await getPokemon(id);
        pokemon.abilities = pokemon.abilities.map( ability => {
          return {name: ability.ability.name, url: ability.ability.url}
        });
        pokemon.types = pokemon.types.map( type => {
          return {name: type.type.name, url: type.type.url}
        });
        
        res.status(200).json({
          name: pokemon.name,
          abilities: pokemon.abilities, 
          types: pokemon.types, 
          height: pokemon.height,
          weight: pokemon.weight,
          sprites: pokemon.sprites})
        break
      case 'PUT':
        // Update or create data in your database
        res.status(200).json({ id, name: name || `Pokemon ${id}` })
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }