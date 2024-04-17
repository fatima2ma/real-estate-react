import { styled } from 'styled-components';
import Button from './Button';
import { toast } from 'react-toastify';

const Modal = styled.div`
    background: rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    position: fixed;
    top: 0;
    align-items: center;
    justify-content: center;
`;

const Controls = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 40%;
    height: 40%;
    padding: 2rem;
    background: #f1f1f1;
    border-radius: 5px;
`;

const Title = styled.h4`
    flex: 1 0 100%;
`;

function ConfirmModal({setShowModal, setConfirmDelete, deleteData}){
    function handleClick(){
        setConfirmDelete();
        deleteData();
    }
    return(
        <Modal>
            <Controls>
                <Title>Are you sure you want to delete this place!?</Title>
                <Button backColor='gray' width='45%' onClick={setShowModal}>Cancel</Button>
                <Button backColor='red' width='45%'  onClick={handleClick}>Delete</Button>
            </Controls>
        </Modal>
    )
}

export default ConfirmModal;