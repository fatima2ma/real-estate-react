import { useState } from 'react';
import { styled } from 'styled-components';
import TextAreaItem from '../components/TextAreaItem';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const ContactWrrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

function Contact({userRef, place}){
    const [message, setMessage] = useState('');
    
    function onChange(e){
        setMessage(e.target.value);
    };
    
    function sendEmail(){
        window.location.href = `mailto:${userRef.email}?subject=${place.title}&body=${message}`;
    }
    return(
        <>
            <ContactWrrap>
                <TextAreaItem title={`Contact ${userRef.username} for the ${place.title}`}
                                lbl='message'
                                placeholder='write your message'
                                onChange={onChange}
                                onClick={sendEmail}/>                
                <Button title='Send a Message' backColor='#276ce7' width='100%' onClick={sendEmail}/>                
            </ContactWrrap>
        </>
    )
}

export default Contact;