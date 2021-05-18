"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.getElementById("app");
const numPokemonInput = document.querySelector("#num-pokemon");
let pokemons = 100;
const fetchData = (offset) => {
    for (let i = offset; i <= pokemons; i++) {
        getPokemon(i);
    }
};
const getPokemon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = yield data.json();
    const pokemonType = pokemon.types
        .map((poke) => poke.type.name)
        .join(", ");
    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
    };
    showPokemon(transformedPokemon);
});
const showPokemon = (pokemon) => {
    let output = `
        <div class='card'>
            <span class='card--id'>#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `;
    container.innerHTML += output;
};
fetchData(1);
const checkNumPokemon = (key) => {
    if (key === "Enter") {
        pokemons = parseInt(numPokemonInput.value);
        if (pokemons > 0 && pokemons <= 600) {
            const currentPokemon = document.getElementsByClassName("card");
            let offset = currentPokemon.length;
            for (let i = 0; i < currentPokemon.length; i++) {
                const poke = currentPokemon[i].classList;
                if (i < pokemons && poke.contains("invisible")) {
                    poke.remove("invisible");
                }
                else if (i > pokemons && !poke.contains("invisible")) {
                    poke.add("invisible");
                }
            }
            fetchData(offset);
        }
    }
};
numPokemonInput.addEventListener("keyup", function (event) { checkNumPokemon(event.key); });
