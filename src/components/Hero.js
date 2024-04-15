import { styled } from "styled-components";
import ImgHero from '../hp-hero.webp';
import { Link } from 'react-router-dom';

const HeroSection = styled.div`
    background: #333;
    width: 100%;
    height: 85dvh;
    display: grid;

    & > *{
        grid-row: 1;
        grid-column: 1;
    }
`;

const HeroImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const HeroIntro = styled.div`
    // margin: 2.5rem 0;
    text-align: center;
    color: #fff;
    text-shadow: rgba(0, 0, 0, 0.25) 0px 1px 3px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    width: 60%;
    max-width: 1000px;
    font-size: clamp(1rem, 10vw, 3.6rem);
`;

const Controls = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
`;

const LinkSt = styled(Link)`
    background: linear-gradient(0deg,#bababa 0,#f0f0f0);
    color: #333;
    padding: .5rem 4rem;
    font-weight: 600;
    font-size: 24px;
    border-radius: 5px;

    &:hover{
        background: linear-gradient(0deg,#f0f0f0 0,#f0f0f0);
    }
`;

function Hero(){
    return(
        <HeroSection>
            <HeroImg src={ImgHero}/>
            <HeroIntro>
            <Title>The #1 site real estate professionals trust*</Title>
            <Controls>
                <LinkSt to={`/places/rent`}>Rent</LinkSt>
                <LinkSt to={`/places/sell`}>Sell</LinkSt>
            </Controls>
            </HeroIntro>
        </HeroSection>
    )
};

export default Hero;