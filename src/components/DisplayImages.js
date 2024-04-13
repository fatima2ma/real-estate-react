import { useRef, useState } from "react";
import { styled } from "styled-components";
import { FaRegImages, FaRedo } from "react-icons/fa";

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
    width: ${props => props.progress}%;
    height: 5px;
    display: block;
    background-color: green;
    transition: width 1.5s ease;
`;

const ImageWrap = styled.div.attrs(props => ({progress: props.progress || '0'}))`
    position: relative;
    overflow: hidden;

    &.newImgs:before{
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

    &.blur img{
        filter: blur(1px);
    }
`;

const SubTitle = styled.h4`
    margin: 1rem 0;
    color: gray;
`;

const Image = styled.img`
    width: 150px;
    height: 100px;
    object-fit: cover;  
    box-shadow: 0px 0px 4px #000;  
`;

const DeleteIcon = styled.span`
    position: absolute;
    line-height: 10px;
    font-weight: bold;
    cursor: pointer;
    margin: 3px;
    text-shadow: 1px 1px 3px #d1d1d1;
    transition: all 0.3s ease;

    &:hover{
        transform: scale(1.2);
        // color: #af0000;
    }
`;

const RedoIcon = styled(FaRedo)`
    position: absolute;
    line-height: 10px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    margin: 5px;
    text-shadow: 1px 1px 3px #d1d1d1;
    z-index:2;
    transition: all 0.5s ease;

    &:hover{
        transform: rotate(330deg);
    }
`;

function DisplayImages({files, progress, setFiles, oldImages = [], setOldImages, mustDeleteImgs = [], setMustDeleteImgs, onChange, deleteImage}){
    console.log('oldimages:', oldImages);
    console.log('must delete images:', mustDeleteImgs);    

    // useEffect()

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

    function handleDelete(imgUrl){
        let temp = oldImages.filter(img => img != imgUrl);
        setOldImages(temp);
        setMustDeleteImgs(prev => [...prev, imgUrl]);
    }

    function cancleDelete(imgUrl){
        let temp = mustDeleteImgs.filter(img => img != imgUrl);
        setOldImages(prev => [...prev, imgUrl]);
        setMustDeleteImgs(temp);
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
        {oldImages &&  
        oldImages.map((file, key) =>
            <ImageWrap progress={progress}>
                <DeleteIcon onClick={() => handleDelete(file)}>x</DeleteIcon>
                <Image src={file} alt={`Image ${file.name}`} width="100" />
                {/* <ProgressBar key={key} progress={progress}></ProgressBar> */}
            </ImageWrap>
        )}
        {files && files.map((file, key) =>
            <ImageWrap className="newImgs" progress={progress}>
                <DeleteIcon onClick={() => excludeFile(file)}>x</DeleteIcon>
                <Image src={URL.createObjectURL(file)} alt={`Image ${file.name}`} width="100" />
                <ProgressBar key={key} progress={progress}></ProgressBar>
            </ImageWrap>
        )}
        {mustDeleteImgs.length > 0 && 
        <SubTitle>Submit to delete completely Or undo deletion</SubTitle>
        }{mustDeleteImgs.length > 0 && mustDeleteImgs.map((file, key) =>
            <ImageWrap className="blur" progress={progress}>
                <RedoIcon onClick={() => cancleDelete(file)}/>
                <Image src={file} alt={`Image ${file.name}`} width="100" />
                {/* <ProgressBar key={key} progress={progress}></ProgressBar> */}
            </ImageWrap>
        )}
        </>
    )
}

export default DisplayImages;