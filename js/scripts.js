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

// Iterate over pokemonList, writing each Pokemon's name and height to the DOM
for (let i = 0; i < pokemonList.length; i++) {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})`);
    // Check to see if the Pokemon's height is greater than 1, and if it is print an extra statement
    if (pokemonList[i].height >= 1) {
        document.write(' - Wow, that\'s big!');
    }
    // Final action in the loop is to close the paragraph for this entry
    document.write('</p>');
}