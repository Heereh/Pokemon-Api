/* const pokeAPi = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
  const data = await response.json();
  console.log(data);
  console.log(`Hola, mi nombre es ${data.name}`);
}; */

const pokeAPi = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
    const data = await response.json();
    console.log(data);
    return data;
    /* console.log(`Hola, mi nombre es ${data.name}`); */
  } catch (error) {
    console.log(error);
  }
};

const contenedor = document.querySelector('.container-poke');

const templatePokemon = pokemon => {
  const { name, sprites, types, id } = pokemon;
  const pokemonHTML = `
          <div class="card" id="card">
          <p class="poke-id-back">#025</p>
            <div class="poke-img">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"alt=""class="sprite"
              />
            </div>
            <div class="card-info">
              <div class="card-info-top">
                <p class="poke-id">#025</p>
                <h2 class="poke-name">Ditto</h2>
              </div>
              <div class="card-info-bottom">
                <p class="electric poke-type">Electrico</p>
              </div>
            </div>
        </div>
  `;
  contenedor.innerHTML = pokemonHTML;
};

const renderPoke = async () => {
  try {
    const pokemon = await pokeAPi();
    templatePokemon(pokemon);
  } catch (error) {
    console.log(error);
  }
};
/* renderPoke(); */
pokeAPi();
