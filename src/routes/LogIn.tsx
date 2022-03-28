import { Link, Route } from "react-router-dom";
import Auth from "../components/Auth";
import Main from "../components/Main";
import Weather from "../components/Weather";

function LogIn() {
    return (
        <>
        <Main />
        <Auth />
        <Weather />
        </>
    )
}

export default LogIn;