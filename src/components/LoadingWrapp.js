import styled from "styled-components";

const LoadingWrapper = styled.div`
    min-width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // max-width: 400px;
    // box-shadow: 0 0 3px #dadada;
    //    min-width: 25%;
    margin-bottom: 1rem;
    border-radius: 5px;
    position: relative;
`;

function LoadingWrapp({children, className}){
    return(
        <LoadingWrapper className={className}>{children}</LoadingWrapper>
    );
}

export default LoadingWrapp;