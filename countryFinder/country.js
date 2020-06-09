function getCountry(url) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', url)
        request.onload = () => {
            if (request.status === 200) {
                resolve(request.response)
            } else {
                reject(Error(request.statusText))
            }
        }

        //handle network errors
        request.onerror = function() {
            reject(Error('Network error'))
        }

        request.send()
    })
}

function successHandler(data) {
    const dataObj = JSON.parse(data)
    console.log(dataObj)
}

function failHandler(data) {
    console.log(data)
}

getCountry("https://restcountries.eu/rest/v2/name/eesti")
    .then(response => successHandler(response))
    .catch(error => failHandler(error))



