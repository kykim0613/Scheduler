import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Main from "../components/Main";
import ModeBtn from "../components/ModeBtn";
import SetImg from "../components/SetImg";
import Weather from "../components/Weather";
import ToDo from '../components/ToDo'
import Board from "../components/Board";
import { IToDo } from "../atom";

const SignIn = styled.div`
    position: absolute;
    right: 10%;
    top: 3%;
    border: none;
    font-size: 16px;
    background: none;
    color: ${(props) => props.theme.textColor};
`

function Home({ userObj }:any, {text}: IToDo) {
    return (
        <>
            <Main />
            <ModeBtn />
            <Weather />
            <SignIn>
                <Link to={{
                    pathname: `/LogIn`
                }}>
                    로그인
                </Link>
            </SignIn>
            <ToDo />
            <Board />
        </>
    )
}

export default Home;