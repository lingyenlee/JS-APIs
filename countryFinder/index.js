const countryForm = document.querySelector("form")
const details = document.querySelector(".details")
const cardTitle = document.querySelector(".card-title")
const card = document.querySelector(".card")
const cardBody = document.querySelector(".card-body")
const flagImage = document.createElement("img")

const countryURL = "https://restcountries.eu/rest/v2/name/";

//handle error response
const handleErrors = function (response) {
    if (!response.ok) {
        throw (response.status + ': ' + response.statusText)
    }
    return response.json()
}

//handle success response
const handleSuccess = function (data) {
    //get country flag
    const countryFlag = data[0].flag
    //console.log(countryFlag)
    flagImage.setAttribute("src", countryFlag)
    flagImage.classList.add("card-img-top")
    card.insertBefore(flagImage, cardBody)

    //get country details
    const countryName = data[0].name
    const pop = () => {
        if (data[0].population >= 1000000) {
            return Math.round(data[0].population / 1000000).toFixed(1) + " million"
        } else {
            return data[0].population + " thousand"
        }
    }



    const cap = data[0].capital
    const continent = data[0].region
    const currency = data[0].currencies[0].name
    const currencySymbol = data[0].currencies[0].symbol
    const language = data[0].languages.map(lang => " " + lang.name)
    const code = data[0].callingCodes
    console.log(data[0])

    cardTitle.innerHTML = `${countryName}`
    details.innerHTML = `
    <ul>
        <li>Capital: ${cap} </li>
        <li>Region: ${continent}</li>
        <li>Population: ${pop()} </li>
        <li>Languages: ${language}  </li>
        <li>Currency: ${currency} (${currencySymbol})</li>
        <li>Calling codes: ${code}</li>
    </ul>`


    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none")
    }
}

const getCountry = function (countryName) {

    let query = `${countryURL}${countryName}`
    fetch(query)
        .then(response => handleErrors(response))
        .then(data => handleSuccess(data))
}

countryForm.addEventListener("submit", e => {
    e.preventDefault();
    let country = countryForm.country.value.trim()
    countryForm.reset()

    getCountry(country)

})