// Wrap Pokemon information in an IIFE
let pokemonRepository = (function() {
    // Within pokemonRepository, create the pokemonList array which will store a list of Pokemon (with corresponding data about that Pokemon)
    let pokemonList = [];

    // Create variable for the modal-container, which will be used to create a modal pop-up when clicking on a Pokemon's button
    let modalContainer = document.querySelector('#modal-container');

    // Create variable to store the link to the API where we will get data from
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

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
        // Show the loading message
        showLoadingMessage();
        // Make a call to the API defined above
        return fetch(apiUrl).then(function(response) {
            // Return a promise (after converting the response from JSON to an object)
            return response.json();
        // Then loop over the object above, and for each object call the add() function to add that Pokemon to our pokemonList array
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            // Hide the loading message
            hideLoadingMessage();
        // Catch any errors durring the API call
        }).catch(function(e) {
            console.error(e);
            // Hide the loading message
            hideLoadingMessage();
        })
    }

    // Function for loading the desired details of each individual Pokemon from the API
    function loadDetails(pokemon) {
        // Show the loading message
        showLoadingMessage();
        // Store the URL for this Pokmeon's details in a variable
        let url = pokemon.detailsUrl;
        // Make a call to the API using the above URL, returning a promise (after converting the response from JSON to an object)
        return fetch(url).then(function(response) {
            return response.json();
        // Then add the details that we want (imageUrl, height and types) to this Pokemon
        }).then(function(details) {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            // Spread syntax for the types to make sure we can reference each type in the array in the showDetails function
            pokemon.types = details.types;
            // Hide the loading message
            hideLoadingMessage();
        // Catch any errors during the API call
        }).catch(function(e) {
            console.error(e);
            // Hide the loading message
            hideLoadingMessage();
        });
    }

    // Function for creating buttons for each Pokemon on the main Pokedex page. This function will be called by each forEach loop
    function addListItem(pokemon) {
        // Set the .pokemon-list ul to pokemonListElement
        let pokemonListElement = document.querySelector('.pokemon-list');

        // Create a li
        let listItem = document.createElement('li');
    
        // Create a button, set it's inner text to the Pokemon in question, add a class for styling
        let listButton = document.createElement('button');
        listButton.innerText = `${pokemon.name}`;
        listButton.classList.add('pokemon-button');
    
        // Append the button to the li, then the li to the ul
        listItem.appendChild(listButton);
        pokemonListElement.appendChild(listItem);

        // Add an event listener for the Pokemon's button, which will show details for that Pokemon when clicked (by calling the showDetails function below)
        listButton.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    // Function for showing the details of each Pokemon when the button for that Pokemon is clicked by creating a modal
    function showDetails(pokemon) {
        // Clear out any existing modal content
        modalContainer.innerHTML = '';

        // Create a div for the modal and add the class 'modal' to it
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add close button to the modal. When the close button is clicked, call the hideModal function
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        // Call the loadDetails function to load Pokemon details from the API, and add this information to the Modal
        loadDetails(pokemon).then(function() {
            // Add the Pokemon's name as an h1 element
            let modalName = document.createElement('h1');
            modalName.innerText = pokemon.name;

            // Add the Pokemon's height as a p element
            let modalHeight = document.createElement('p');
            modalHeight.innerText = 'Height: ' + pokemon.height;

            // Add the Pokemon's types as a p element
            let modalTypes = document.createElement('p');
            let thisPokemonTypes = 'Types: ';
            // Loop through the pokemon.types array, then get type.name for the display name of the type
            pokemon.types.forEach(function(individualType) {
                thisPokemonTypes += individualType.type.name + ' ';
            });
            // Add final list of types to modalTypes
            modalTypes.innerText = thisPokemonTypes;

            // Add the sprite image of this Pokemon in an img tag
            let modalImage = document.createElement('img');
            modalImage.src = pokemon.imageUrl;

            // Append each element to the modal div, then append the modal div to the modalContainer
            modal.appendChild(closeButtonElement);
            modal.appendChild(modalName);
            modal.appendChild(modalHeight);
            modal.appendChild(modalTypes);
            modal.appendChild(modalImage);
            modalContainer.appendChild(modal);

            // Make the modal visible
            modalContainer.classList.add('is-visible');

        });
    }

    // Function for hiding the modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // Event listener to close the modal when the esc key is pressed
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    // Event listener to close the modal when the mouse is clicked outside of the modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    // Function for showing a loading message while waiting for a response from the API
    function showLoadingMessage() {
        let loadingMessage = document.querySelector('#loading');
        loadingMessage.style.display = 'block';
    }


    // Function for hiding the loading message that is displayed in showLoadingMessage()
    function hideLoadingMessage() {
        let loadingMessage = document.querySelector('#loading');
        loadingMessage.style.display = 'none';
    }

    // Return only the functions defined above
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();


// Loop over the pokemonList array, using the printPokemonList function to write out each Pokemon's details
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
});