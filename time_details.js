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
    defaultOption.innerText = 'Select a city';
    defaultOption.setAttribute('value', '');
    citiesList.appendChild(defaultOption);
    for (let i = 0; i < 5; i++) {
        let option = document.createElement('option');
        option.innerText = values[i];
        option.setAttribute('value', `${values[i]}`);
        citiesList.appendChild(option);
    }
    const brAdder = document.createElement('br')
    mainDiv.appendChild(brAdder);
    mainDiv.appendChild(citiesList);

    tableContainer = document.createElement('table');
    tableContainer.setAttribute('style', 'border: 3px;');
    citiesList.addEventListener('change', async function (event) {
        if (event.target['value'] === '') {
            console.log(event.target['value']);
            tableContainer.setAttribute('hidden', '');
        } else {
            console.log(event.target['value']);
            let response = await fetch(`https://api.aerisapi.com/observations/search?query=name:${event.target['value']}&client_id=OX8AFyQAhKqVnTG2E20Em&client_secret=vU7Y00MeTXvVGATUDsyTFe46OXVCs7gtZaaZ5z53`);
            response = await response.json();

            console.log(response);
        }
    })

}
const main = async () => {
    timeDetails();
    getWeather();


}

main();