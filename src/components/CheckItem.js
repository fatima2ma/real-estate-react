import { styled } from 'styled-components';

const InputWrrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
`;

const Lbl = styled.label`
    flex-basis: 20%;
    font-size:14px;
    font-weight: bold;
`;

const Btn = styled.button`
    flex-grow: 1;
    box-shadow: 0 0 6px rgba(0,0,0,.2);
    height: 35px;
    border-radius: 5px;
    padding: 0 4rem;
    cursor: pointer;
    &.active{
        background-color: #276ce7;
        box-shadow: 0 0 1px rgba(0,0,0,.2);
        color: #fff;
    }
`;

const HorStack = styled.div`
    display: flex;
    gap: 2rem;
`;

function CheckItem({title ,lbl, type, placeholder, onChange, value, active}){
    // if(active || active === value.split('/')[0]){console.log(true)};
    return(
        <InputWrrap>
            <Lbl htmlFor={lbl}>{title}</Lbl>
            <HorStack>
                <Btn type={type} onClick={onChange} id={lbl} 
                    value={value.split('/')[0] === 'yes' ? true : value.split('/')[0]}
                    className={((active && value.split('/')[0] === 'yes') || active === value.split('/')[0])  && 'active'}>
                        {value.split('/')[0]}
                </Btn>
                <Btn type={type} onClick={onChange} id={lbl} 
                    value={value.split('/')[1] === 'no' ? false : value.split('/')[1]}
                    className={((!active && value.split('/')[1] === 'no') || active === value.split('/')[1]) &&  'active'}>
                        {value.split('/')[1]}
                </Btn>
            </HorStack>
        </InputWrrap>
    )
}

export default CheckItem;