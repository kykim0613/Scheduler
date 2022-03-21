import { ICoordinates } from "./atom";

const API_KEY = "e8bf3889f2eb88ab8fdd829542403f05";

export function onGeo({position}: any) {
    const lat = 30;
    const lon = 30;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
    `;
    return fetch(url).then((res) => res.json())
}

export function geoError () {
    alert("can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeo, geoError)

// async function WeatherAPI() {
//     fetch(url).then((res) => res.json())
// }
