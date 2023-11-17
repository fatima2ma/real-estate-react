
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormItem from '../../components/FormItem';
import SectionWrraper from '../../components/SectionWrraper';
import Wrraper2col from '../../components/Wrraper2col';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Form = styled.form`
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
`;

const LinkSt = styled(Link)`
    align-self: end;
    font-size: 14px;
    font-weight: bold;
    color: #276ce7;
`;

const CardImg = styled.img`
    width: 100%;
    auto: 400px;
`;

function SignIn(){
    const navigate = useNavigate();
    const auth = getAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const {email, password} = formData;
    
    function onChange(e){
        setFormData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value, 
        }));
    }
    function onSubmit(e){
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
            const user = userCredential.user;
            if(user) navigate('/');
        }).catch(error => {
            console.log(error.code);
            console.log(error.message);
        });            
    }
    return(
        <SectionWrraper classStyle='shadow'>
        <Wrraper2col>
        <Form onSubmit={onSubmit}>
            <SectionHeader title='Signin' subTitle='Welcome again please write the required information'/>
            <FormItem onChange={onChange} title='User Email' type='email' placeholder='write yor email please...' lbl='email'/>
            <FormItem onChange={onChange} title='Password' type='Password' placeholder='write yor password please...' lbl='password'/>
            <LinkSt to='../forgotpassword'>Forgot Password</LinkSt>
            <Button type='submit' title='Signin'/>
        </Form>
        <CardImg src='https://picsum.photos/200'/>
        </Wrraper2col>
        </SectionWrraper>
    )
};

export default SignIn;