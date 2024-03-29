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

const TextArea = styled.textarea`
    flex-grow: 1;
    box-shadow: 0 0 2px rgba(0,0,0,.2);
    min-height: 60px;
    border-radius: 5px;
    padding: 1rem;
`;

function TextAreaItem({title ,lbl, type, placeholder, onChange, rows ,value}){
    return(
        <InputWrrap>
            <Lbl htmlFor={lbl}>{title}</Lbl>
            <TextArea onChange={onChange} id={lbl} placeholder={placeholder} value={value} rows={rows}></TextArea>
        </InputWrrap>
    )
}

export default TextAreaItem;