import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    color: gray;
    font-size: 0.8rem;
    margin: 0 1rem;
    height: 100%;
    text-decoration: none;
    font-weight: bold;
    border-top: 2px solid transparent;
    border-bottom: 2px solid #ff000000;
    transition: all .2s ease;
    text-transform: capitalize;

    &.active, &&:hover{
        color: #000;
        border-bottom: 2px solid #ff0000;
    }
`;

function NavbarItem({to, title}){
    return(
        <NavItem to={to}>{title}</NavItem>
    )
};

export default NavbarItem;