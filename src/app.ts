const container: HTMLElement | any = document.getElementById("app");
const numPokemonInput: HTMLElement | any = document.querySelector("#num-pokemon");
let pokemons: number = 100;

interface IPokemon {
    id: number;
    name: string;
    image: string;
    type: string;
}

const fetchData = (offset: number): void => {
    for (let i = offset; i <= pokemons; i++) 
    {
        getPokemon(i);
    }
}

const getPokemon = async (id: number): Promise<void> => {

    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon: any = await data.json();
    const pokemonType: string = pokemon.types
        .map((poke: any) => poke.type.name)
        .join(", ");

    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
    }

    showPokemon(transformedPokemon);
}

const showPokemon = (pokemon: IPokemon): void => {
    let output: string = `
        <div class='card'>
            <span class='card--id'>#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `;

    container.innerHTML += output;
}

fetchData(1);

const checkNumPokemon = (key: string): void => {
    if (key === "Enter") 
    {
        pokemons = parseInt(numPokemonInput.value);

        if (pokemons > 0 && pokemons <= 600) 
        {
            const currentPokemon: HTMLElement | any = document.getElementsByClassName("card");
            let offset: number = currentPokemon.length;
            for (let i = 0; i < currentPokemon.length; i++)
            {
                const poke = currentPokemon[i].classList;
                if (i < pokemons && poke.contains("invisible")) 
                {
                    poke.remove("invisible");
                }else if (i > pokemons && !poke.contains("invisible"))
                {
                    poke.add("invisible");
                }
            }

            fetchData(offset);
        }
    }
}
numPokemonInput.addEventListener("keyup", function(event: KeyboardEvent): void {checkNumPokemon(event.key)});