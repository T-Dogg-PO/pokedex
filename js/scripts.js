// Wrap Pokemon information in an IIFE
let pokemonRepository = (function() {
    // Within pokemonRepository, create the pokemonList array which will store a list of Pokemon (with corresponding data about that Pokemon)
    let pokemonList = [];

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

    // Set function to add new Pokemon objects to the pokemonList array
    function add(pokemon) {
        // Check that the Pokemon being added has the datatype of 'object' and show an alert if it is not
        if (typeof(pokemon) !== "object") {
            alert('This Pokemon is not an object, please check the datatype and resubmit.');
        // Check that the number of keys given is exactly 3, or else alert the user that they don't have the right number of properties
        } else if (Object.keys(pokemon).length !== 3) {
            alert('Please make sure that your Pokemon contains a name, height and types');
        // Check that the 3 keys given are 'name', 'height' and 'types', otherwise alert the user that they don't have the right keys
        } else if (!pokemon.hasOwnProperty('name') || !pokemon.hasOwnProperty('height') || !pokemon.hasOwnProperty('types')) {
            alert('Please make sure that your Pokmeon contains a name, height and types');
        // If all the other checks pass, add the Pokemon object to the pokemonList array
        } else {
            pokemonList.push(pokemon);
        }
    }

    // Set function to get a list of all the Pokemon objects
    function getAll() {
        return pokemonList;
    }

    // Set function for searching for a specific Pokemon by its name
    function findPokemon(pokemonName) {
        // Create a new array of searchResults using the filter function to pick results where the input Pokemon name matches the name in pokemonList
        searchResults = pokemonList.filter(function(pokemon) {
            return pokemon.name === pokemonName;
        })

        return searchResults;
    }

    // Return only the functions defined above
    return {
        add: add,
        getAll: getAll,
        findPokemon: findPokemon
    };
})();


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
pokemonRepository.getAll().forEach(printPokemonList);