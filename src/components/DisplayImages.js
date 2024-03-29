import { useRef } from "react";
import { styled } from "styled-components";
import { FaRegImages } from "react-icons/fa";

const InputContainer = styled.div`
    flex: 0 1 100%;
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

const ProgressBar = styled.span.attrs(props => ({progress: props.progress || '0'}))`
    width: ${props => props.progress}px;
    height: 5px;
    display: block;
    background-color: green;
    transition: width 1.5s ease;
`;

const ImageWrap = styled.div.attrs(props => ({progress: props.progress || '0'}))`
    position: relative;
    overflow: hidden;

    &:before{
        content:'${props => props.progress}%';
        transition: all 1.5s ease;
        width: 150px;
        height: 100px;
        background: rgba(0,0,0,0.3);
        position:absolute;
        top:${props => props.progress}%;
        left:0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fafafa;
    }
`;

const Image = styled.img`
    width: 150px;
    height: 100px;
    object-fit: cover;    
`;

const DeleteIcon = styled.span`
    position: absolute;
    line-height: 10px;
    font-weight: bold;
    cursor: pointer;
    margin: 3px;
    text-shadow: 1px 1px 3px #d1d1d1;

`;

function DisplayImages({files, progress, setFiles, onChange}){

    const hiddenFileInput = useRef(null);

    function handleClick(e){
        hiddenFileInput.current.click();
    }

    function excludeFile(file){
        let tempFiles = files.filter(fl => fl != file);
        setFiles(tempFiles);
        const newFileList = new DataTransfer();
        tempFiles.forEach(file => newFileList.items.add(file));
        const fileInput = hiddenFileInput.current;
        fileInput.files = newFileList.files;
        document.querySelector('.inputFiles').dispatchEvent(new Event("change", { bubbles: true }));
    }
    return(
        <>
         <InputContainer>
            <input className="inputFiles" ref={hiddenFileInput} onChange={onChange} type='file' name='files' multiple='true' style={{display:'none'}} accept='.png,.jpg,.jpeg' />
            <InputFileBtn type='button' onClick={handleClick}>
                <IconWrap><Icon></Icon></IconWrap>
                Upload Images
            </InputFileBtn>            
        </InputContainer>
        {files.map((file, key) =>
            <ImageWrap progress={progress}>
                <DeleteIcon onClick={() => excludeFile(file)}>x</DeleteIcon>
                <Image src={URL.createObjectURL(file)} alt={`Image ${file.name}`} width="100" />
                <ProgressBar key={key} progress={progress}></ProgressBar>
            </ImageWrap>
        )}
        </>
    )
}

export default DisplayImages;