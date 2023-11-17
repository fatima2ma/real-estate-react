import styled from 'styled-components';

const Btn = styled.button.attrs(props => ({$backColor: props.backColor || 'green', $width: props.width || '75%'}))`
    background: ${props => props.$backColor};
    cursor: pointer;
    line-height: 35px;
    color: white;
    width: ${props => props.$width};
    text-align: center;
    font-weight: bold;
    border-radius: 5px;
    align-self: center;
    padding: 0 .5rem;
`;

function Button({title, type, backColor, width, onClick}){
    return(
        <Btn onClick={onClick} type={type} backColor={backColor} width={width}>{title}</Btn>
    )
}

export default Button;