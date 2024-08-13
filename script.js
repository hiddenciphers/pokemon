const searchBtn = document.getElementById('search-button');
const input = document.getElementById('search-input');
const pokemon = document.getElementById('pokemon-name');
const id = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const typesDiv = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const frame = document.getElementById('sprite-frame');


let pokemonAPI = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input.value}`;

searchBtn.addEventListener('click', (input) => {
  resetApp();
  validateInput();
});

const validateInput = () => {
  if (!input.value) {
    alert("Please enter a Pokémon Name or ID");
  } else if (input.value === "Red") {
    alert("Pokémon not found");
  } else {
      fetchData();
      
  }
};

const fetchData = async () => {
  try {
    const res = await fetch(pokemonAPI);
    const data = await res.json();
    const { count, results } = data;
    checkForPokemon(results);
  } catch (err) {
    console.log(err);
  }
};

const checkForPokemon = (results) => {
  for (let i = 0; i < results.length; i++) {
      if (input.value.toLowerCase() === results[i].name) {
        pokemon.textContent = `${results[i].name.toUpperCase()}`;
        id.textContent = ` #${results[i].id}`;
        pokemon.style.visibility = "visible";
        id.style.visibility = "visible";
        let proxyUrl = `${results[i].url}`;
        fetchProxyData(proxyUrl);
      } else if (Number(input.value == results[i].id)) {
          pokemon.textContent = `${results[i].name.toUpperCase()}`;
          id.textContent = ` #${results[i].id}`;
          pokemon.style.visibility = "visible";
          id.style.visibility = "visible";
          let proxyUrl = `${results[i].url}`;
          fetchProxyData(proxyUrl);
      }
    }
};

const fetchProxyData = async (proxyUrl) => {
  try {
    const res = await fetch(proxyUrl);
    const proxy = await res.json();
    const { base_experience, height, id, name, order, sprites, stats, types, weight } = proxy;
    displayProps(weight, height, sprites, types);
    checkTypes(types);
    displayStats(stats);

  } catch (err) {
    console.log(err);
  }
};

const displayProps = (weight, height, sprites, types) => {
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  pokemonWeight.style.visibility = "visible";
  pokemonHeight.style.visibility = "visible";
  frame.innerHTML = `<img id="sprite" src="${sprites.front_default}" style="display: block;"/>`;
  frame.style.visibility = "visible";
  typesDiv.innerHTML = `<span class="span-1 type-span">${types[0].type.name.toUpperCase()}</span>`; 
};

const checkTypes = (types) => {
  try {
      if (types[1] && types[1].type.name) {
      typesDiv.innerHTML += `<span class="span-2 type-span">${types[1].type.name.toUpperCase()}</span>`;
    } else if (types[2] && types[2].type.name) {
        typesDiv.innerHTML += `<span class="span-3 type-span">${types[2].type.name.toUpperCase()}</span>`;
    }
    } catch (err) {
    console.error(err);
  }
};

const displayStats = (stats) => {
  hp.textContent = stats[0].base_stat;
  attack.textContent = stats[1].base_stat;
  defense.textContent = stats[2].base_stat;
  specialAttack.textContent = stats[3].base_stat;
  specialDefense.textContent = stats[4].base_stat;
  speed.textContent = stats[5].base_stat;
};

const resetApp = () => {
  pokemon.textContent = ``;
  pokemon.style.visibility = "hidden";
  id.textContent = ``;
  id.style.visibility = "hidden";
  pokemonWeight.textContent = ``;
  pokemonWeight.style.visibility = "hidden";
  pokemonHeight.textContent = ``;
  pokemonHeight.style.visibility = "hidden";
  frame.innerHTML = ``;
  frame.style.visibility = "hidden";
  typesDiv.innerHTML = ``;
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};

