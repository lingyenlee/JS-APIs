
const fetchPokemon = async () => {

    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=80")
        const allPokemons = await response.data.results

        console.log(response.data)
        // console.log(getNumberOfPages(allPokemons))

        allPokemons.forEach(pokemon => {
            fetchPokemonData(pokemon)
        })
    } catch (error) {
        console.error(error)
    }
}


const fetchPokemonData = async data => {

    try {
        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
        const pokemonData = await response.data
        //console.log(pokemonData.length)
        displayPokemonData(pokemonData)

    } catch (error) {
        console.error(error)
    }
}

const displayPokemonData = (data) => {

    //get or create element from DOM
    const cardWrapper = document.querySelector(".card-wrapper")
    const card = document.createElement("div")
    const cardBody = document.createElement("div")
    const cardTitle = document.createElement("h5")
    const cardText = document.createElement("div")

    //add classes to elements
    card.classList.add("card")
    cardBody.classList.add("card-body")
    cardTitle.classList.add("card-title")
    cardText.classList.add("card-text")

    //add pokemon name to card-title
    cardTitle.innerHTML = `${data.name} (${data.id})`
    cardText.innerHTML =
        `<p><i class="fas fa-ruler-vertical"></i> ${data.height} pokemeter</p>
        <p><i class="fas fa-weight"></i> ${data.weight} pokegram</p>
    `

    //get pokemon image and display
    displayPokemonImage(data.id, card)

    //append divs to parent divs
    cardBody.append(cardTitle)
    cardBody.append(cardText)
    card.append(cardBody)
    cardWrapper.append(card)

}

const displayPokemonImage = (id, div) => {

    const pokemonImg = document.createElement("img")
    pokemonImg.classList.add("card-img-top")
    pokemonImg.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${id}.png`)

    div.append(pokemonImg)

}

fetchPokemon()

function getNumberOfPages(data) {

    return Math.ceil(data.length / 15)

}

const list = new Array()
const pagelist = new Array()

