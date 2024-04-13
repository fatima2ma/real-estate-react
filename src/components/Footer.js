import styled from 'styled-components';

// shadow #276ce7
// bg #222

const FooterDiv = styled.footer`
    background-color: #2e2e2e;
    box-shadow: 0px 0px 0px .1rem #276ce7;
    padding: .9rem 6rem;
    color: #fff;
    margin-top: auto;
    font-size: 12px;

    & p {
        // padding: .5rem 0;
        text-align: center;
    }
`;

const Link = styled.a`
    color: #276ce7;
`;

function Footer(){
    return(
        <FooterDiv>
            <p>Made by Fatima.ma to another projects, check <Link href='https://codepen.io/fatima-ma'>Codepen</Link> account. </p>
        </FooterDiv>
    )
};

export default Footer;