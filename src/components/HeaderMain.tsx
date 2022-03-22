import styled from 'styled-components';
import img5 from '../img/img5.jpg'
import ToDo from './ToDo';

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
    padding-top: 100px;
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
    z-index: -1;
`


function HeaderMain() {
    return(
        <Wrapper>
            S C H E D U L E R
            <ToDo />
            <BgImg src={img5} />
        </Wrapper>
    )
}

export default HeaderMain;