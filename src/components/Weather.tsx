import { useEffect, useState } from "react"
import { render } from "react-dom";
import styled from "styled-components";
import { onGeo } from "../api";

const API_KEY = "e8bf3889f2eb88ab8fdd829542403f05";

interface IGeo {
    base: string;
    clouds: number;
    cod: number;
    coord: number;
    id: number;
    main: number;
    name: string;
    type: number;
    sys: {
        country: string;
        id: number;
        sunrise: number;
        sunset: number;
        type: number;
    }
    timezone: number;
    visibility: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }
    wind: number;
}
const Loading = styled.div`
    position: fixed;
    left: 5%;
    bottom: 7%;
`

const WeatherWrapper = styled.div`
    position: fixed;
    font-size: 16px;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    left: 5%;
    bottom: 5%;
    span{
        color: ${(props) => props.theme.textColor};
        letter-spacing: 1px;
    }
`

function Weather(position: any) {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState<any>();
    useEffect(() => {
        const geo = (position: any) => {
            getDataFunc(position.coords.latitude, position.coords.longitude);
        }

        navigator.geolocation.getCurrentPosition(geo)
    }, []);
    const getDataFunc = (latitude: number, longitude: number) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setState(data)
                setLoading(false)
            })
    }
    // navigator.geolocation.getCurrentPosition((position) => {
    //     latitude = position.coords.latitude;
    //     longitude = position.coords.longitude;
    //     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    //     setLat(position.coords.latitude);
    //     setLon(position.coords.longitude);
    //     fetch(url)
    //         .then((res) => res.json()
    //             .then((data) => {
    //                 console.log(data.main)
    //             })
    //         )
    // }, error)
    return (
        <WeatherWrapper>
            {loading ? <Loading>Loading...</Loading> : <>
            <span>{Math.floor(state?.main.temp)} ºC</span><hr />
            {state?.weather[0].main}
            </>}
            {/* {state?.main.temp_max} º/{state?.main.temp_min} º<br /> */}
        </WeatherWrapper>
    )
}



// (position) => {
//     const lat = position.coords.latitude;
//     console.log(lat)
//     const lon = position.coords.longitude;
//     console.log(lon)
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//     return fetch(url).then((res) => res.json())
// }



export default Weather;