import { useNavigate } from "react-router-dom";
import React from "react";
import { authService } from "../fireB";

function LogOut () {
    const history = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        history("/");
    }

    return (
        <>
        <button onClick={onLogOutClick}>로그아웃</button>
        </>
    )
}

export default LogOut;