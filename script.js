async function searchCharacter() {
    const input = document.getElementById('name').value;

    if (input === '') {
        let pError = document.getElementById('error')
        pError.innerHTML = 'Digite o nome de um personagem'
        clearElements()

        setTimeout(() => {
            pError.innerHTML = ''
        }, 3000)

        return;
    }

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
            let pError = document.getElementById('error')
            pError.innerHTML = ''

        } else if (data.id) {
            createCharacterElements(data.name, data.image, data.gender, data.species, data.status);
            let pError = document.getElementById('error')
            pError.innerHTML = ''
        } else {
            let pError = document.getElementById('error')
            pError.innerHTML = "Nenhum personagem encontrado"
            clearElements()
            console.log('Character not found');
        }
    } catch (error) {
        console.error('Error fetching character:', error);
    }
}

const body = document.querySelector('body');

function createCharacterElements(name, image, gender, species, status) {
    let pName = document.getElementById('pName');
    pName.innerHTML = `${name}`;

    let img = document.getElementById('img');
    img.style.backgroundImage = `url(${image})`;
    

    let pGender = document.getElementById('pGender');
    pGender.innerHTML = `Genero: ${gender}`;

    let pSpecies = document.getElementById('pSpecies');
    pSpecies.innerHTML = `Espécie: ${species}`;

    let pStatus = document.getElementById('pStatus');
    pStatus.innerHTML = `Status: ${status}`;
}

function handleKeyPress(event) {   
    if (event.key === 'Enter') {
        searchCharacter()
    }        
}

function clearElements() {
    let pName = document.getElementById('pName');
    pName.innerHTML = '';

    let img = document.getElementById('img');
    img.style.backgroundImage = `none`
    

    let pGender = document.getElementById('pGender');
    pGender.innerHTML = ``;

    let pSpecies = document.getElementById('pSpecies');
    pSpecies.innerHTML = ``;

    let pStatus = document.getElementById('pStatus');
    pStatus.innerHTML = ``;
}