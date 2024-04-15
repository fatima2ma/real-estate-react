import styled from 'styled-components';

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

const Input = styled.input`
    flex-grow: 1;
    box-shadow: 0 0 2px rgba(0,0,0,.2);
    height: 35px;
    border-radius: 5px;
    padding: 1rem;

    &:disabled{
        background: #ddd;
    }
`;

function FormItem({title ,lbl, type, placeholder, onChange, multiple=false, min, max, accept, maxLength, disabled=false, minLength, step='', value}){
    return(
        <InputWrrap>
            <Lbl htmlFor={lbl}>{title}</Lbl>
            <Input 
                value={value}
                onChange={onChange} 
                id={lbl} 
                type={type} 
                placeholder={placeholder} 
                multiple={multiple}
                min = {min}
                max = {max}
                accept={accept}
                maxLength={maxLength}
                minLength={minLength}
                step={step}
                disabled={disabled}/>
        </InputWrrap>
    )
}

export default FormItem;