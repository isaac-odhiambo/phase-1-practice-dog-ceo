const breedUrl = "https://dog.ceo/api/breeds/list/all";
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedList = document.getElementById('breed-list');
const imageGallery = document.getElementById('image-gallery');
const breedFilter = document.getElementById('breed-filter');
let breedsArray = [];

// Fetch random dog images
fetch(imgUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.message.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Dog Image';
            imageGallery.appendChild(img);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Fetch dog breeds
fetch(breedUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        breedsArray = Object.keys(data.message); // Store the breeds in an array
        displayBreeds(breedsArray); // Display all breeds initially
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Function to display breeds
function displayBreeds(breeds) {
    breedList.innerHTML = ''; // Clear existing list
    breeds.forEach(breed => {
        const li = document.createElement('li');
        li.textContent = breed;
        li.addEventListener('click', () => {
            li.style.color = 'blue'; // Change color on click
        });
        breedList.appendChild(li);
    });
}

// Event listener for the dropdown filter
breedFilter.addEventListener('change', (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds = selectedLetter ? 
        breedsArray.filter(breed => breed.startsWith(selectedLetter)) : 
        breedsArray;
    displayBreeds(filteredBreeds);
});