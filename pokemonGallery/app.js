const cardWrapper = document.querySelector(".card-wrapper")
const currentPage = document.querySelector(".current")
const currentAnchor = document.querySelector(".page-link.current")
const nextPage = document.querySelector(".next")
const nextAnchor = document.querySelector(".page-link.next")
const prevPage = document.querySelector(".prev")
const prevAnchor = document.querySelector(".page-link.prev")

let currentPageNum = 1
let numPerPage = 20
const totalPageCount = Math.ceil(964 / 20)
currentAnchor.innerHTML = `Page ${currentPageNum} of ${totalPageCount}`
currentPage.append(currentAnchor)



const fetchPokemon = async (e, num) => {

    e.preventDefault()
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${numPerPage}&offset=${(num - 1) * numPerPage}`
    //console.log(url)
    try {
        const response = await axios.get(url)
        const allPokemons = await response.data.results
        // console.log(response)

        allPokemons.forEach(pokemon => {
            fetchPokemonData(pokemon)
        })
    } catch (error) {
        console.error(error)
    }
}


const fetchPokemonData = async (data) => {

    try {
        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
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


// const totalNumPages = (data) => {
//     return Math.ceil(data.count / numPerPage)
// }
window.addEventListener("load", (e) => {
    e.preventDefault()
    fetchPokemon(e, currentPageNum)
}, false)


nextPage.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("before", currentPageNum)
    currentPageNum++
    fetchPokemon(e, currentPageNum)
    console.log("after click", currentPageNum)

}, false)

prevPage.addEventListener("click", (e) => {
    e.preventDefault()
    currentPageNum--
    console.log(currentPageNum)
}, false)


