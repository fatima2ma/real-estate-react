import styled from 'styled-components';

const Btn = styled.button.attrs(props => ({$backColor: props.backColor || 'green', 
    $width: props.width || '75%', 
    $gridCol: props.gridCol || 'unset',
    $lineHeight: props.lineHeight || '35px'}))`
    background: ${props => props.$backColor};
    grid-column: ${props => props.$gridCol};
    line-height: ${props => props.$lineHeight};
    cursor: pointer;
    color: white;
    width: ${props => props.$width};
    text-align: center;
    font-weight: bold;
    border-radius: 5px;
    align-self: center;
    padding: 0.3rem .5rem;

    &:disabled{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background: gray;
        cursor: not-allowed;
    }

`;

function Button({children, title, type, backColor, width, onClick, disabled, gridCol, lineHeight}){
    return(
        <Btn onClick={onClick} type={type} backColor={backColor} width={width} lineHeight={lineHeight} gridCol={gridCol} disabled={disabled}>{title} {children}</Btn>
    )
}

export default Button;