import { Link, Route, Routes } from "react-router-dom";
import Auth from "../components/Auth";
import Main from "../components/Main";
import LogIn from "./LogIn";
import ModeBtn from "../components/ModeBtn";
import SetImg from "../components/SetImg";
import Weather from "../components/Weather";
import LogOut from "../components/LogOut";
import styled from "styled-components";
import ToDo from "../components/ToDo";
import Board from "../components/Board";

const SignIn = styled.div`
    position: absolute;
    right: 10%;
    top: 3%;
`


function HomeSignIn({ userObj }: any) {
    return (
        <>
            <Main />
            <ModeBtn />
            <Weather />
            <SignIn>
                <LogOut />
            </SignIn>
            <ToDo />
            <Board />
        </>
    )
}

export default HomeSignIn;