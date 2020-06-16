const cardWrapper = document.querySelector(".card-wrapper")

//pagination buttons
const firstPage = document.querySelector("#first")
const previousButton = document.querySelector("#previous")
const nextButton = document.querySelector("#next")
const currentPage = document.querySelector("#current")
const lastPage = document.querySelector("#last")
let numPerPage = 20
let currentPageNum = 1
const totalPageCount = Math.ceil(800 / 20)
console.log(totalPageCount)

//search buttons
const searchBtn = document.querySelector("#search-btn")
const searchBar = document.querySelector("#search-bar")
const resetBtn = document.querySelector("#reset-btn")

searchBtn.addEventListener("click", () => {

    fetchPokemonData(searchBar.value)

    //clear page
    cardWrapper.innerHTML = ""

})


//make pokemon API call to get 20 pokemons each time
const fetchPokemon = async (e, num) => {

    // e.preventDefault()
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${numPerPage}&offset=${(num - 1) * numPerPage}`
    try {
        const response = await axios.get(url)
        const allPokemons = await response.data.results
       // console.log(allPokemons)

       //clear page
        cardWrapper.innerHTML = ""

        allPokemons.forEach(pokemon => {
            fetchPokemonData(pokemon.name)
        })
    } catch (error) {
        console.error(error)
    }

    updatePage(num)
}


const fetchPokemonData = async (data) => {

    try {
        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${data}`)
        const pokemonData = await response.data
        displayPokemonData(pokemonData)

    } catch (error) {
        console.error(error)
    }

}

const displayPokemonData = (data) => {

    //get or create element from DOM

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

const updatePage = (num) => {

    currentPage.innerHTML = `Page ${num} of ${totalPageCount}`

    if (num === 1) {
        previousButton.disabled = true
    } else {
        previousButton.disabled = false
    }

    if (num === totalPageCount) {
        nextButton.disabled = true
    } else {
        nextButton.disabled = false
    }
}

window.addEventListener("load", (e) => {
    e.preventDefault()
    fetchPokemon(e, currentPageNum)
}, false)


nextButton.addEventListener("click", (e) => {
    e.preventDefault()
    currentPageNum++
    fetchPokemon(e, currentPageNum)
    updatePage(currentPageNum)
}, false)

previousButton.addEventListener("click", (e) => {
     e.preventDefault()
    currentPageNum--
    fetchPokemon(e, currentPageNum)
}, false)

resetBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetchPokemon(e, currentPageNum),
        searchBar.value = ""
}, false)