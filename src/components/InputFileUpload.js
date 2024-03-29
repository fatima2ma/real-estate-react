import { useState ,useRef } from 'react';
import { styled } from "styled-components";
import { FaRegImages } from "react-icons/fa";

const InputContainer = styled.div`

`;

const InputFileBtn = styled.button`
    display: flex;
    align-items: center;
    gap: .5rem;
    background: linear-gradient(#fff, #f1f1f1);
    box-shadow: 0 0 1.5px 0.5px rgb(0 0 0 / 25%);
    border: 1px solid #ebeaea;
    border-radius: 5px;
    // margin: 2rem;
    font-weight: bold;
    cursor:pointer;
    padding: .0rem .5rem;
    min-height: 48px;
    min-width: 48px;
`;

const IconWrap = styled.span`
    display:flex;
    gap: .5rem;
    align-items: center;
    
    &&:after{
        content:'';
        width:1px;
        min-height:48px;
        background: #c8c8c8;
        // position: absolute;
        // top:-.6rem;
        // right: 0rem;       
    }
    
`;

const Icon = styled(FaRegImages)`
    width:auto;
    height: 28px;
`;

function InputFileUpload({onChange, files}){
    const hiddenFileInput = useRef(null);

    function handleClick(e){
        hiddenFileInput.current.click();
    }
    return(
        <InputContainer>
            <input ref={hiddenFileInput} onChange={onChange} type='file' name='files' multiple='true' style={{display:'none'}} accept='.png,.jpg,.jpeg' />
            <InputFileBtn type='button' onClick={handleClick}>
                <IconWrap><Icon></Icon></IconWrap>
                Upload Images
            </InputFileBtn>
            
        </InputContainer>
        
    )
}

export default InputFileUpload;