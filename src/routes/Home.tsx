import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HeaderMain from "../components/HeaderMain";
import ModeBtn from "../components/ModeBtn";
import SetImg from "../components/SetImg";
import Weather from "../components/Weather";

const SignIn = styled.div`
    position: absolute;
    right: 10%;
    top: 3%;
`


function Home({ userObj }: any) {
    return (
        <>
            <HeaderMain />
            <SetImg />
            <ModeBtn />
            <Weather />
            <SignIn>
                <Link to={{
                    pathname: `/LogIn`
                }}>
                    로그인
                </Link>
            </SignIn>
            <div>
                { }
            </div>
        </>
    )
}

export default Home;