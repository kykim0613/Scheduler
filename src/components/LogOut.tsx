import { useNavigate } from "react-router-dom";
import React from "react";
import { authService } from "../fireB";
import styled from "styled-components";

const LogOutBtn = styled.button`
    border: none;
    font-size: 16px;
    background: none;
    color: ${(props) => props.theme.textColor};
`

function LogOut () {
    const history = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        history("/Scheduler");
    }

    return (
        <>
        <LogOutBtn onClick={onLogOutClick}>로그아웃</LogOutBtn>
        </>
    )
}

export default LogOut;