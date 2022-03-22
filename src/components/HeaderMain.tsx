import styled from 'styled-components';
import img5 from '../img/img5.jpg'

const Wrapper = styled.div`
    display: grid;
    width: 100%;
    height: 100vh;
    color: ${(props) => props.theme.textColor};
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 700;
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
            <BgImg src={img5} />
        </Wrapper>
    )
}

export default HeaderMain;