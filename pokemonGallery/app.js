
const fetchPokemon = async () => {

    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")
        const allPokemons = await response.data.results
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
        console.log(pokemonData)
        displayPokemonData(pokemonData)
        // displayPokemonImage(pokemonData.id)
        //console.log(pokemonData.id)
        // pokemonData.forEach(pokemon => {
        //     displayPokemonImage(pokemon.id)
        // })


    } catch (error) {
        console.error(error)
    }
}

const displayPokemonData = (data) => {

    const cardWrapper = document.querySelector(".card-wrapper")
    const card = document.createElement("div")
    const cardBody = document.createElement("div")
    const title = document.createElement("h5")

   
    card.classList.add("card")
    cardBody.classList.add("card-body")
    title.classList.add("card-title")

    title.innerHTML = `${data.name}`

   
    displayPokemonImage(data.id, card)
    cardBody.append(title)
   
   
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

