// Create a variable which will store a list of Pokemon (with corresponding data about that Pokemon)
pokemonList = [];

// Add sample data to the array to test basic functionality
pokemonList[0] = {
    name: 'Bulbasaur',
    height: 0.7,
    types: ['Grass', 'Poison']
}

pokemonList[1] = {
    name: 'Charmander',
    height: 0.6,
    types: ['Fire']
}

pokemonList[2] = {
    name: 'Charizard',
    height: 1.7,
    types: ['Fire', 'Flying']
}

pokemonList[3] = {
    name: 'Squirtle',
    height: 0.5,
    types: ['Water']
}

// Function for writing the details of a given Pokemon object to the DOM
function printPokemonList(pokemon) {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})`);
    // Check to see if the Pokemon's height is greater than 1, and if it is print an extra statement
    if (pokemon.height >= 1) {
        document.write(' - Wow, that\'s big!');
    }
    // Final action of the function is to close the paragraph for this entry
    document.write('</p>');
}

// Loop over the pokemonList array, using the printPokemonList function to write out each Pokemon's details
pokemonList.forEach(printPokemonList);