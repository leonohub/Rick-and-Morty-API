async function searchCharacter() {
    const input = document.getElementById('name').value;

    let url;
    if (!isNaN(parseInt(input))) {
        url = `https://rickandmortyapi.com/api/character/${parseInt(input)}`;
    } else {
        url = `https://rickandmortyapi.com/api/character/?name=${input}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();


        if (data.results && data.results.length > 0) {
            const character = data.results[0];
            createCharacterElements(character.name, character.image, character.gender, character.species, character.status);
        } else if (data.id) {
            createCharacterElements(data.name, data.image, data.gender, data.species, data.status);
        } else {
            console.log('Character not found');
        }
    } catch (error) {
        console.error('Error fetching character:', error);
    }
}

const body = document.querySelector('body');

function createCharacterElements(name, image, gender, species, status) {
    let div = document.createElement('div');
    div.id = 'character-div';

    let pName = document.createElement('p');
    pName.id = 'character-name';
    pName.innerHTML = `${name}`;

    let img = document.createElement('img');
    img.id = 'character-img';
    img.src = image;

    let pGender = document.createElement('p');
    pGender.innerHTML = `Genero: ${gender}`;
    pGender.id = 'character-gender';

    let pSpecies = document.createElement('p');
    pSpecies.innerHTML = `Espécie: ${species}`;
    pSpecies.id = 'character-species';

    let pStatus = document.createElement('p');
    pStatus.innerHTML = `Status: ${status}`;
    pStatus.id = 'character-status';

    div.appendChild(pName);
    div.appendChild(img);
    div.appendChild(pGender);
    div.appendChild(pSpecies);
    div.appendChild(pStatus);

    body.appendChild(div);
}

function handleKeyPress(event) {   
    if (event.key === 'Enter') {
        searchCharacter()
    }        
}