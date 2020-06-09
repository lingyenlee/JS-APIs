const countryURL = "https://restcountries.eu/rest/v2/name/";
const details = document.querySelector(".details")
const cardTitle = document.querySelector(".card-title")

//handle error response
const handleErrors = function (response) {
    if(!response.ok) {
        throw (response.status + ': ' + response.statusText )
    }
    return response.json()
}

//handle success response
const handleSuccess = function (data) {
    const countryName = data[0].name
    const pop = Math.round(data[0].population/1000000).toFixed(1)
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
    <li>Population: ${pop} million</li>
    <li>Languages: ${language}  </li>
    <li>Currency: ${currency} (${currencySymbol})</li>
    <li>Calling codes: ${code}</li>
</ul>`
}

const getCountry = function (countryName) {

    let query = `${countryURL}${countryName}`
    fetch(query)
        .then(response => handleErrors(response))
        .then(data => handleSuccess(data))
}


getCountry("Belgium")





// function getCountry(url) {
//     return new Promise((resolve, reject) => {
//         let request = new XMLHttpRequest();
//         request.open('GET', url)
//         request.onload = () => {
//             if (request.status === 200) {
//                 resolve(request.response)
//             } else {
//                 reject(Error(request.statusText))
//             }
//         }

//         //handle network errors
//         request.onerror = function() {
//             reject(Error('Network error'))
//         }

//         request.send()
//     })
// }

// function successHandler(data) {
//     const dataObj = JSON.parse(data)
//     console.log(dataObj)
// }

// function failHandler(data) {
//     console.log(data)
// }

// getCountry("https://restcountries.eu/rest/v2/name/eesti")
//     .then(response => successHandler(response))
//     .catch(error => failHandler(error))



