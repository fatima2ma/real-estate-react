import { Link } from "react-router-dom";
import SectionWrraper from "../components/SectionWrraper";
import SectionHeader from "../components/SectionHeader";
import styled from "styled-components";

const CenterElems = styled.div`
   text-align: center;
   display: flex;
   flex-direction: column;
   gap: 1rem;
`;
const Btn = styled(Link)`
    cursor: pointer;
    text-decoration: underline;
    color: blue;
`;
function NotFound(){
    return(
        <SectionWrraper>
            <CenterElems>
            <h2>404 - No found</h2>
            <h4> It seem's that you've lost the way back to home.</h4>
            <Btn to='/'>Home</Btn>
            </CenterElems>
        </SectionWrraper>
    )
}

export default NotFound;