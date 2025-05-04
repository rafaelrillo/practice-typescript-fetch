const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=120';

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
const searchInput = document.querySelector("#search") as HTMLInputElement;

async function fetchPokemonList() {
  const response = await fetch(API_URL)
  const data: PokemonListResponse = await response.json();

  for (const pokemon of data.results) {
    const imageUrl = await fetchPokemonDetails(pokemon.url);

    const listItem = document.createElement("li");
    const nameSpan = document.createElement("span");
    nameSpan.textContent = pokemon.name

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = pokemon.name;
    img.width = 100;

    listItem.appendChild(nameSpan)
    listItem.appendChild(img);
    listElement.appendChild(listItem);
  }
}

async function fetchPokemonDetails(url: string): Promise<string> {
  const response = await fetch(url)
  const data = await response.json();
  return data.sprites.front_default
}


searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLocaleLowerCase();
  const listItems = listElement.querySelectorAll("li");
  
  listItems.forEach(item => {
    const name = item.querySelector("span")?.textContent?.toLocaleLowerCase() || "";
    const isVisible = name.includes(searchTerm);
    (item as HTMLLIElement).style.display = isVisible ? "block" : "none";
  })
})

fetchPokemonList();
