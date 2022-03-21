import styled from 'styled-components';

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

function HeaderMain() {
    return(
        <Wrapper>
            S C H E D U L E R
        </Wrapper>
    )
}

export default HeaderMain;