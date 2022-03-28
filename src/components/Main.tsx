import styled from 'styled-components';
import img5 from '../img/img5.jpg'
import bgFront from '../img/bgFront.png'
import Board from './Board';
import ToDo from './ToDo';
import meteor from '../img/meteor.png';
import { keyframes } from 'styled-components';

const animation = keyframes`
    0%{
        right: 0;
        top: 0;
        opacity: 0;
    }
    100% {
        right: 110%;
        top: 100%;
        opacity: 1;
    }
`

const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    color: ${(props) => props.theme.textColor};
    font-size: 30px;
    font-weight: 700;
    font-size: 30px;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding-top: 130px;
`
const BgImg = styled.img`
    position: fixed;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    min-width: fit-content;
    min-height: fit-content;
    z-index: -2;
`
const BgFrontImg = styled.img`
    position: fixed;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    min-width: fit-content;
    min-height: fit-content;
    z-index: 0;
`
const MeteorBox = styled.div`
    width: 1200px;
    height: 100vh;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: -1;
`
const Meteor = styled.img`
    width: 100px;
    position: absolute;
    animation: ${animation} 4s linear infinite;
`
const MeteorBox2 = styled.div`
    width: 1200px;
    height: 100vh;
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: -1;
`
const Meteor2 = styled.img`
    width: 150px;
    position: absolute;
    animation: ${animation} 3s linear infinite;
`
function Main() {
    return(
        <Wrapper>
            S C H E D U L E R
            <BgFrontImg src={bgFront} />
            <BgImg src={img5} />
            <MeteorBox>
            <Meteor src={meteor} />
            </MeteorBox>
            <MeteorBox2>
            <Meteor2 src={meteor} />
            </MeteorBox2>
        </Wrapper>
    )
}

export default Main;