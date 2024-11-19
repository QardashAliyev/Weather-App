let divElement = document.querySelector(".weather");
let form = document.querySelector("#input-form");
let input = document.querySelector("#input");
let addButton = document.querySelector("#check");
let clearButton = document.querySelector("#clear");
let date = document.querySelector("#date");
let country = document.querySelector("#country");
let temperature = document.querySelector("#temperature");
events();
function events() {
    form.addEventListener("submit", getWeather);
    clearButton.addEventListener("click", clear);
}

function clear() {
    input.value = "";
    date.value = "";
    divElement.innerHTML = "";
    country.innerHTML = "";
    temperature.textContent = "";
}
function getWeather(e) {
    let value = input.value.trim();
    fetch(`http://api.weatherapi.com/v1/current.json?key=767f402e29e54f8a9bf170828241010&q=${value}&aqi=no1`)
        .then((response) => response.json())
        .then((data) => {
            showIcon(data.current.condition.icon, data.current.condition.text);
            date.value = data.location.localtime;
            country.innerHTML = `Country: ${data.location.country.toUpperCase()} `;
            temperature.textContent = `Temp: ${parseInt(data.current.feelslike_c)}`;
        })

        .catch((error) => console.log(error))
    e.preventDefault();
}
function showIcon(url, text) {
    let div = document.createElement("div");
    div.className = "card";
    let img = document.createElement("img");
    img.className = "images";
    img.setAttribute("src", url);
    img.width = "200";
    img.height = "200";
    let h2 = document.createElement("h2");
    h2.textContent = text;
    div.appendChild(img);
    div.appendChild(h2);
    divElement.appendChild(div);
}

