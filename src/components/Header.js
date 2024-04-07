import { useContext } from 'react';
import styled from 'styled-components';
import NavbarItem from '../components/NavbarItem';
import Btn from '../components/Button';
import { getAuth } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const HeaderWrap = styled.div`
    width: 100%;
    max-width: 1400px;
    height: 40px;
    padding: 0 6rem;
    margin-inline: auto;
    box-shadow: 0px 4px 2px -2px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    
    @media (max-width: 575px){
        padding: 0;
    }
`;

const ElemsWrap = styled.div`
    width: 100%;
    height:100%;
    max-width: 1900px;
    display: flex;
    align-items: center;
`;

const LogoText = styled.h1`
    font-size: 1rem;
    padding: 0 1rem;
    flex-grow: 1;
`;
const NavCont = styled.nav`
    display: flex;
    height:100%;
`;
const CustLink = styled(Link)`
    background-color: green;
    color: white;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    border-radius: 5px;
    align-self: center;
    padding: .3rem .7rem;
    transition: all .3s ease;

    &:hover{
        filter: saturate(1.5);
    }
`;

function Header(){
    const auth = getAuth();
    const navigate = useNavigate();

    const {signOutAuth} = useContext(AuthContext);

    function logout(){
        console.log('signout');
        signOutAuth();
    }
    return(
        <HeaderWrap>
            <ElemsWrap>
            <LogoText>RealTor.com</LogoText>
            <NavCont className='navBarCont'>
                <NavbarItem title='Home' to='/home'/>
                <NavbarItem title='Offers' to='/offers'/>
                <NavbarItem title='Profile' to='/profile'/>              
            </NavCont>
        {auth.currentUser ? 
            <Btn type='button' onClick={logout} title='logout' backColor='gray' width='auto' lineHeight='unset'/>
            :
            <CustLink to='./signin'>Login</CustLink>
        }
            </ElemsWrap>
        </HeaderWrap>
    )
};

export default Header;