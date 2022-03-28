import { Link } from "react-router-dom";
import styled from "styled-components";


const NavHome = styled.div`
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    letter-spacing: 2px;
    position: absolute;
    left: 5%;
    top: 3%;
`
const Navigation = () => (
    <nav>
        <ul>
            <NavHome>
                <Link to="/Scheduler">
                    SCHEDULER
                </Link>
            </NavHome>
        </ul>
    </nav>
)
export default Navigation;