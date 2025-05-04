const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10';

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[]
}

interface PokemonDetail {
  sprites: {
    front_default: string;
  }
}

const listElement = document.querySelector("#pokemon-list") as HTMLUListElement;

async function fetchPokemonList() {
  const response = await fetch(API_URL)
  const data: PokemonListResponse = await response.json();
  console.log(data)

  for (const pokemon of data.results) {
    const imageUrl = await fetchPokemonDetails(pokemon.url);

    const listItem = document.createElement("li");
    listItem.textContent = pokemon.name;

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = pokemon.name;
    img.width = 100;

    listItem.appendChild(img);
    listElement.appendChild(listItem);
  }
}

async function fetchPokemonDetails(url: string): Promise<string> {
  const response = await fetch(url)
  const data = await response.json();
  return data.sprites.front_default
}

fetchPokemonList();

