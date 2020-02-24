const timeDetails = async () => {


    API_KEY = 'DYZKC6DAULK4'
    button = document.createElement('button');
    button.innerText = 'Get Time';

    mainDiv = document.getElementById('main');

    timeContainer = document.createElement('p');

    mainDiv.innerText = '';

    timeContainer.innerText = '';

    mainDiv.appendChild(button);

    button.addEventListener('click', async function (event) {
        let res = await fetch('http://api.timezonedb.com/v2.1/get-time-zone?key=DYZKC6DAULK4&by=zone&zone=Africa/Djibouti&format=json');

        console.log(res);

        res = await res.json();

        console.log(res);

        const countryName = res['countryName'];
        let formatted = res['formatted'];

        formatted = formatted.slice(formatted.indexOf(' ') + 1);
        console.log(countryName, formatted);

        timeContainer.innerText = countryName + ' ' + formatted;

        mainDiv.appendChild(timeContainer);
    });


}


const getWeather = async () => {
    let mainDiv = document.getElementById('main');

    let citiesList = document.createElement('select');
    citiesList.setAttribute('id', 'selector');



    let values = ['Los Angeles,CA', 'Sacramento,CA', 'Albany,NY', 'Baton Rouge,LA', 'Eugene,OR']

    let defaultOption = document.createElement('option');
    const brAdder = document.createElement('br')
    defaultOption.innerText = 'Select a city';
    defaultOption.setAttribute('value', '');
    mainDiv.appendChild(brAdder);
    mainDiv.appendChild(brAdder);
    citiesList.appendChild(defaultOption);
    for (let i = 0; i < 5; i++) {
        let option = document.createElement('option');
        option.innerText = values[i];
        option.setAttribute('value', `${values[i]}`);
        citiesList.appendChild(option);
    }

    mainDiv.appendChild(brAdder);
    mainDiv.appendChild(brAdder);
    mainDiv.appendChild(brAdder);
    mainDiv.appendChild(citiesList);

    const tableContainer = document.createElement('table');
    tableContainer.setAttribute('style', 'border: 3px solid black; display: collapse;');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    citiesList.addEventListener('change', async function (event) {
        if (event.target['value'] === '') {
            console.log(event.target['value']);
            tableContainer.hidden = true;
        } else {
            console.log(event.target['value']);
            let response = await fetch(`https://api.aerisapi.com/observations/search?query=name:${event.target['value']}&client_id=OX8AFyQAhKqVnTG2E20Em&client_secret=vU7Y00MeTXvVGATUDsyTFe46OXVCs7gtZaaZ5z53`);
            response = await response.json();

            console.log(response['response'][0]);

            let headers = ['city', 'tempC', 'tempF', 'humidity', 'skyConditions'];
            let headersValues = []

            const cityName = event.target['value'].slice(0, event.target['value'].indexOf(','));
            headersValues.push(cityName);
            const temperatureC = response['response'][0]['ob']['tempC'];
            headersValues.push(temperatureC);
            const temperatureF = response['response'][0]['ob']['tempF'];
            headersValues.push(temperatureF);
            const humidity = response['response'][0]['ob']['humidity'];
            headersValues.push(humidity)
            const skyConditions = response['response'][0]['ob']['sky'];
            headersValues.push(skyConditions);




            console.log(temperatureC, temperatureF, humidity, skyConditions, cityName);


            tableHeader.innerText = '';
            tableBody.innerText = '';
            for (let i = 0; i < 5; i++) {
                let tableHeaderCell = document.createElement('th');
                tableHeaderCell.innerText = headers[i];
                tableHeader.appendChild(tableHeaderCell);
            }

            for (let i = 0; i < 5; i++) {
                let tableBodyCell = document.createElement('td');
                tableBodyCell.setAttribute('style', 'border: 2px solid green');
                tableBodyCell.innerText = headersValues[i];
                tableBody.appendChild(tableBodyCell);
            }

            tableContainer.appendChild(tableHeader);
            tableContainer.appendChild(tableBody);

            console.log(tableContainer);
            tableContainer.hidden = false;
            mainDiv.appendChild(tableContainer);
        }
    })

}
const main = async () => {
    timeDetails();
    getWeather();


}

main();