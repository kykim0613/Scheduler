import { type } from "os";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atom";

const DarkBtn = styled.button`
    width: 150px;
    height: 50px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    position: fixed;
    right: 5%;
    bottom: 3%;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 2px 2px 3px 1px black;
    font-weight: 800;
    letter-spacing: 1px;
    :hover {
        background-color: ${(props) => props.theme.btnAccentColor};
        color: ${(props) => props.theme.btnColor};
    }
`


function ModeBtn() {
    const [state, setState] = useState(true)
    const darkBtnValue = useSetRecoilState<boolean>(isDarkAtom)
    const onClick = () => {
        darkBtnValue((prve) => !prve)
        setState(!state)
    }
    return (
        <>
            <DarkBtn onClick={onClick}>{state ? "다크 모드로 보기" : "라이트 모드로 보기"}</DarkBtn>
        </>
    )
}

export default ModeBtn;