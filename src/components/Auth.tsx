import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../fireB";
import ModeBtn from './ModeBtn'

const Wrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

const AuthForm = styled.form`
    width: 250px;
    
`
const AuthInput = styled.input`
    text-indent: 3px;
    width: 250px;
    height: 40px;
    font-size: 14px;
    margin-bottom: 5px;
`
const AuthSubmit = styled.input`
    width: 250px;
    height: 50px;
    font-size: 14px;
    margin-bottom: 10px;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    cursor: pointer;
    position: relative;
    left: 50%;
    transform: translate(-50%);
`

const GoogleBtn = styled.button`
    width: 250px;
    height: 50px;
    border-radius: 30px;
    border: 0;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    cursor: pointer;
`

function Auth() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [er, setEr] = useState<string>("");
    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password)
            } else {
                data = await signInWithEmailAndPassword(authService, email, password)
            }
            console.log(data)
        } catch (error) {
            setEr("")
        }
    }
    const onChange = (event: any) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSocialClick = async (event: any) => {
        const { target: { name } } = event;
        let provider: any;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data)
        navigate("/")
    }
    return (
        <>
            <Wrapper>
                <AuthForm onSubmit={onSubmit}>
                    <AuthInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={onChange}
                    />
                    <AuthInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={onChange}
                    />
                    <AuthSubmit type="submit" value={"Sign in"} />
                    {er}
                </AuthForm>
                <div>
                    <GoogleBtn onClick={onSocialClick} name="google">Continue with Google</GoogleBtn>
                    { }
                </div>
            </Wrapper>
            <ModeBtn />
        </>
    )
}

export default Auth;