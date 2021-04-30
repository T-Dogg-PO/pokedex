// Wrap Pokemon information in an IIFE
let pokemonRepository = (function () {
    // Within pokemonRepository, create the pokemonList array which will store a list of Pokemon (with corresponding data about that Pokemon)
    let pokemonList = [];

    // Create variable to store the link to the API where we will get data from and variables for filtering by generation
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let apiGen1 = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let apiGen2 = 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=151';
    let apiGen3 = 'https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251';
    let apiGen4 = 'https://pokeapi.co/api/v2/pokemon/?limit=107&offset=386';
    let apiGen5 = 'https://pokeapi.co/api/v2/pokemon/?limit=156&offset=493';
    let apiGen6 = 'https://pokeapi.co/api/v2/pokemon/?limit=72&offset=649';
    let apiGen7 = 'https://pokeapi.co/api/v2/pokemon/?limit=88&offset=721';
    let apiGen8 = 'https://pokeapi.co/api/v2/pokemon/?limit=89&offset=809';
    let apiAllGen = 'https://pokeapi.co/api/v2/pokemon/?limit=898';

    // Change generation function. When called it will reload the list using an updated API link
    function changeGen() {
        loadList().then(function () {
            getAll().forEach(function (pokemon) {
                addListItem(pokemon);
            })
        });
    }

    // Listen for selection of a generation. Takes the ID of the link that's selected, then changes apiUrl to match the selected filter
    let dropdownItems = $('.dropdown-item');
    dropdownItems.on('click', function () {
        let selectedID = $(this).attr('id');
        let selectedButton = $(this);
        let previousButton = $('.active');
        previousButton.removeClass('active');
        selectedButton.addClass('active');
        if (selectedID === 'all') {
            apiUrl = apiAllGen;
        } else if (selectedID === 'gen1') {
            apiUrl = apiGen1;
        } else if (selectedID === 'gen2') {
            apiUrl = apiGen2;
        } else if (selectedID === 'gen3') {
            apiUrl = apiGen3;
        } else if (selectedID === 'gen4') {
            apiUrl = apiGen4;
        } else if (selectedID === 'gen5') {
            apiUrl = apiGen5;
        } else if (selectedID === 'gen6') {
            apiUrl = apiGen6;
        } else if (selectedID === 'gen7') {
            apiUrl = apiGen7;
        } else if (selectedID === 'gen8') {
            apiUrl = apiGen8;
        }
        // Remove all existing Pokemon buttons from ul
        $('#pokemon-list').children().remove();
        // Clear out the pokemonList array
        pokemonList = [];
        // Call changeGen to reload the Pokemon list with the updated API link
        changeGen();
    });

    // Set function to add new Pokemon objects to the pokemonList array
    function add(pokemon) {
        // Add the Pokemon passed in to the pokemonList array (I have removed all data validation checks for now since the data coming from the API should be correctly formatted)
        pokemonList.push(pokemon);
    }

    // Set function to get a list of all the Pokemon objects
    function getAll() {
        return pokemonList;
    }

    // Function for loading the list of Pokemon from the API
    function loadList() {
        // Show the loading spinner
        showLoadingSpinner();
        // Make a call to the API defined above
        return fetch(apiUrl).then(function (response) {
            // Return a promise (after converting the response from JSON to an object)
            return response.json();
            // Then loop over the object above, and for each object call the add() function to add that Pokemon to our pokemonList array
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                // Capitalize the Pokemon's name
                pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                add(pokemon);
            });
            // Hide the loading spinner
            hideLoadingSpinner();
            // Catch any errors durring the API call
        }).catch(function (e) {
            console.error(e);
            // Hide the loading spinner
            hideLoadingSpinner();
        })
    }

    // Function for loading the desired details of each individual Pokemon from the API
    function loadDetails(pokemon) {
        // Show the loading spinner for the modal
        showLoadingModalSpinner();
        // Store the URL for this Pokmeon's details in a variable
        let url = pokemon.detailsUrl;
        // Make a call to the API using the above URL, returning a promise (after converting the response from JSON to an object)
        return fetch(url).then(function (response) {
            return response.json();
            // Then add the details that we want (imageUrl, height and types) to this Pokemon
        }).then(function (details) {
            pokemon.imageUrl = details.sprites.other['official-artwork'].front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
            // Hide the loading spinner
            hideLoadingModalSpinner();
            // Catch any errors during the API call
        }).catch(function (e) {
            console.error(e);
            // Hide the loading spinner
            hideLoadingModalSpinner();
        });
    }

    // Function for creating buttons for each Pokemon on the main Pokedex page. This function will be called by each forEach loop
    function addListItem(pokemon) {
        // Set the .pokemon-list ul to pokemonListElement
        let pokemonListElement = $('#pokemon-list');

        // Create a li with Bootstrap classes for the list group
        let listItem = $('<li class="list-group-item col col-lg-3 border-0 m-auto"></li>');

        // Create a button, set it's inner text to the Pokemon in question, add Bootstrap class for buttons
        let listButton = $(`<button type="button" data-toggle="modal" data-target="#pokemonModal" class="btn btn-block">${pokemon.name}</button>`);

        // Append the button to the li, then the li to the ul
        listItem.append(listButton);
        pokemonListElement.append(listItem);

        // Add an event listener for the Pokemon's button, which will show details for that Pokemon when clicked (by calling the showDetails function below)
        listButton.on('click', function () {
            showDetails(pokemon);
        });
    }

    // Function for showing the details of each Pokemon when the button for that Pokemon is clicked by showing a modal
    function showDetails(pokemon) {
        // Call the loadDetails function to load Pokemon details from the API, and add this information to the Modal
        loadDetails(pokemon).then(function () {
            let modalTitle = $('#pokemon-modal-header');
            let modalBody = $('#pokemon-modal-body');

            // Empty existing modal content
            modalBody.empty();
            modalTitle.empty();

            // Show the loading spinner for the modal
            showLoadingModalSpinner();

            // Add the Pokemon's name as an h1 element
            let modalName = $(`<h1 class="w-100 text-center">${pokemon.name}</h1>`);

            // Add the Pokemon's height as a p element
            let modalHeight = $(`<p class="text-center">Height: ${(pokemon.height) / 10}m</p>`);

            // Add the Pokemon's types as a p element
            let modalTypes = $(`<p class="text-center">Types: </p>`);

            // Loop through the pokemon.types array, then get type.name for the display name of the type
            pokemon.types.forEach(function (individualType) {
                // Adding a span here will allow us to change the colour of this type section depending on what type it is
                let typesSpan = $(`<span class="${individualType.type.name} pokemon-type text-center"></span>`);
                // Capitalize the type name
                let capitalType = individualType.type.name.charAt(0).toUpperCase() + individualType.type.name.slice(1);
                // Add the type text to the <span>
                typesSpan.text(`${capitalType} `);
                // Add the <span> to the <p> element above
                modalTypes.append(typesSpan);
            });

            // Add the sprite image of this Pokemon in an img tag
            let modalImage = $(`<img class="img-fluid" src="${pokemon.imageUrl}">`);

            // Add close button for the modal
            let closeButton = $('<button type="button" class="btn-close" data-dismiss="modal" aria-label="close">X</button>');

            // Hide the loading modal spinner
            hideLoadingModalSpinner();

            // Append each element to the appropriate part of the modal
            modalTitle.append(modalName);
            modalTitle.append(closeButton);
            modalBody.append(modalHeight);
            modalBody.append(modalTypes);
            modalBody.append(modalImage);
        });
    }

    // Function for showing a loading spinner while waiting for a response from the API
    function showLoadingSpinner() {
        let loadingSpinner = document.querySelector('#loading');
        loadingSpinner.style.display = 'block';
    }

    // Function for hiding the loading spinner that is displayed in showLoadingMessage()
    function hideLoadingSpinner() {
        let loadingSpinner = document.querySelector('#loading');
        loadingSpinner.style.display = 'none';
    }

    // Function for showing a loading spinner while the pop-up modal loads
    function showLoadingModalSpinner() {
        let loadingSpinner = document.querySelector('#loading-modal');
        loadingSpinner.style.display = 'block';
    }

    // Function for hiding the loading spinner while the pop-up modal loads
    function hideLoadingModalSpinner() {
        let loadingSpinner = document.querySelector('#loading-modal');
        loadingSpinner.style.display = 'none';
    }

    // Event listener for search box in navbar
    let pokemonSearch = $('#pokemon-search');
    // On any input into the search box, run the inner function
    pokemonSearch.on('input', function () {
        // Store values of the list of Pokemon and the search value in the search box
        let listOfPokemon = $('.list-group-item');
        let searchValue = pokemonSearch.val().toLowerCase();

        // Loop through the listOfPokemon
        listOfPokemon.each(function () {
            // Convert the inner text of each entry (i.e. the name on each button) to a string
            let pokemonEntry = $(this).text()
            // Check to see if searchValue exists in the pokemonEntry string
            if (pokemonEntry.toLowerCase().indexOf(searchValue) > -1) {
                // If yes, do nothing to change the display
                this.style.display = '';
            } else {
                // Otherwise, hide this entry on the page
                this.style.display = 'none';
            }
        });
    });

    // Return only the functions defined above
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails,
    };
})();


// Loop over the pokemonList array, using the printPokemonList function to write out each Pokemon's details
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
});
