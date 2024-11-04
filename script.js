async function searchCharacter() {
    const name = document.getElementById('name').value;

    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const data = await response.json();
            

    if (data.results && data.results.length > 0) {
        const character = data.results[0]; // get the first character
        console.log(character);
    }
}
