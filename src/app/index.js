const pokemonsContainer = document.querySelector('.container-poke');
const botonesType = document.querySelector('.btn-header');

const appState = {
  currentURL: 'https://pokeapi.co/api/v2/pokemon/?limit=9&offset=0',
  isFetching: false,
};

async function getPokemonData() {
  const { next, results } = await pokeAPi(appState.currentURL);
  appState.currentURL = next;

  const pokemonDataURLs = results.map((pokemon) => pokemon.url);

  const pokemonsData = await Promise.all(
    pokemonDataURLs.map(async (url) => {
      const nextPokemonData = await fetch(url);
      return await nextPokemonData.json();
    }),
  );
  console.log(pokemonsData);
  return pokemonsData;
}

async function loadAndRenderPoke(renderFunction) {
  const pokemonData = await getPokemonData();
  renderFunction(pokemonData);
}

const pokemonTemplate = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name.toUpperCase(),
    //image: pokemon.sprites.other.home.front_default,//
    image: pokemon.sprites.front_default,
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    types: pokemon.types,
    experience: pokemon.base_experience,
  };
};

const typeCard = (types) => {
  return types
    .map((tipo) => {
      return `<p class="${tipo.type.name} poke-type">${tipo.type.name}</p>`;
    })
    .join('');
};

function createPokemonCard(pokemon) {
  const { id, name, image, types } = pokemonTemplate(pokemon);
  //<p class="poke-id-back">${id} </p>//

  return `
          <div class="card" id="card">
            <div class="poke-id-back">#${id}</div>
            <div class="poke-img">
              <img src=${image} class="sprite"
              />
            </div>
            <div class="card-info">
              <div class="card-info-top">
                <p class="poke-id">#${id}</p>
                <h2 class="poke-name">${name} </h2>
              </div>
              <div class="card-info-bottom">
                ${typeCard(types)}
              </div>
            </div>
          </div>
  `;
}

const renderPokeList = (pokemonList) => {
  pokemonsContainer.innerHTML += pokemonList
    .map((pokemon) => createPokemonCard(pokemon))
    .join('');
};

/* const showPokemonsTypes = e => {
  const buttonId = e.currentTarget.id;

  pokemonsContainer.innerHTML = '';

  for
}; */

const EndPage = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  const isbottom = scrollTop + clientHeight >= scrollHeight - 5;

  return isbottom;
};

const renderInfinite = (pokemonList) => {
  setTimeout(() => {
    renderPokeList(pokemonList);
    appState.isFetching = false;
  }, 1500);
};
const loadNextPokemons = async () => {
  if (!appState.isFetching && EndPage()) {
    appState.isFetching = true;
    loadAndRenderPoke(renderInfinite);
  }
};

function init() {
  window.addEventListener('DOMContentLoaded', async () => {
    await loadAndRenderPoke(renderPokeList);
  });
  window.addEventListener('scroll', async () => {
    await loadNextPokemons();
  });
  /* botonesType.addEventListener('click', showPokemonsTypes); */
}

init();
