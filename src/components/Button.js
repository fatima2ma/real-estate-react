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
    min-width: fit-content;
    text-align: center;
    font-weight: bold;
    border-radius: 5px;
    align-self: center;
    padding: 0.3rem .5rem;
    filter: drop-shadow(0px 1px 1px #333);
    transition: all .3s ease;
    
    &.shadow{
        box-shadow: 1px 1px 1px #eee;
        &:hover{
            box-shadow: 1px 1px 2px #333;
        }
    }
    &:hover:not(.shadow){
        filter: hue-rotate(25deg);
    }
    &:disabled{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background: gray;
        cursor: not-allowed;
    }

`;

function Button({children, ref, classStyle,title, type, backColor, width, onClick, disabled, gridCol, lineHeight}){
    return(
        <Btn ref={ref} onClick={onClick} className={classStyle} type={type} backColor={backColor} width={width} lineHeight={lineHeight} gridCol={gridCol} disabled={disabled}>{title} {children}</Btn>
    )
}

export default Button;