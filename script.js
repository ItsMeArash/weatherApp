const form = document.querySelector('.top-banner form');
const cityInput = form.querySelector('input');
const apiKey = "981417e4702b1cb8d27b30cb81acfa22";
async function weatherAPICall(cityDetails)
{
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityDetails[0].lat}&lon=${cityDetails[0].lon}&appid=${apiKey}&units=metric`;
    const cityWeather = await fetch(weatherURL)
        .then(response => response.json());

    const {main, name, sys, weather} = cityWeather;
    const icon = await `http://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`;
    const li = document.createElement('li');
    li.classList.add('city');
    const markup = `
    <h2 class='city-name' data-name=${name},${sys.country}>
        <span>${name}</span>
        <span>${sys.country}</span>
    </h2>
    <div class='city-temp'>${Math.round(main.temp)}</div>
    <figure>
        <img class='city-icon' src='${icon}' alt='city' >
        <figuecaption>${weather[0]["description"]}</figurecaption>
    </figure>
    `; 
    li.innerHTML = markup;
    document.querySelector('ul.cities').appendChild(li);
}
form.addEventListener('submit', async function(event){
    event.preventDefault();
    const geoCodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&appid=${apiKey}`;
    let cityDetails = await fetch(geoCodingURL)
                    .then(response => response.json())
    weatherAPICall(cityDetails);
    cityInput.value = '';
})


