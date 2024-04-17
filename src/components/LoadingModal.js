import { styled } from "styled-components";
import LoadBtn from "../components/LoadBtn";

const Modal = styled.div`
    background: rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    position: fixed;
    top: 0;
`;

const CloseBtn = styled.span`
    line-height: 20px;
    width: 30px;
    height: 30px;
    font-weight: bold;
    text-align: center;
    text-shadow: 0px 0px 2px #333;
    cursor: pointer;
    align-self: end;
    margin: 1rem;
    border: 3px dotted #333;
    border-radius: 50%;
    transition: all .3s ease;

    &:hover{
        border-style: dashed;
    }
`;

const LoadingSvg = styled.div`
    margin: auto;
`;

function LoadingModal({setShowModal}){

    return(
        <Modal className='modal'>
            <CloseBtn onClick={setShowModal}>x</CloseBtn>
            <LoadingSvg><LoadBtn/></LoadingSvg>
        </Modal>
    )
}

export default LoadingModal;