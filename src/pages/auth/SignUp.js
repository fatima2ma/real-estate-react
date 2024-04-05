
import { useState, useContext } from 'react';
import styled from 'styled-components';
import FormItem from '../../components/FormItem';
import SectionWrraper from '../../components/SectionWrraper';
import MidWrraper from '../../components/MidWrraper';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Form = styled.form`
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    text-align: start;
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

function SignUp(){
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:'',
    });
    
    const {username, email, password} = formData;
    
    const {SignUpAuth} = useContext(AuthContext);

    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));        
    }
    
    function onSubmit(e){
        e.preventDefault();
        SignUpAuth(username, email, password);
    }
    return(
        // <SectionWrraper classStyle='shadow'>
        <MidWrraper>
        <Form onSubmit={onSubmit}>
            <SectionHeader title='Join Us'/>
            <FormItem onChange={onChange} title='User Name' type='text' placeholder='write yor name please...' lbl='username'/>
            <FormItem onChange={onChange} title='User Email' type='email' placeholder='write yor email please...' lbl='email'/>
            <FormItem onChange={onChange} title='Password' type='Password' placeholder='write yor password please...' lbl='password'/>
            <LinkSt to='../signin'>already have an account</LinkSt>
            <Button type='submit' title='SignUp'/>
        </Form>
        {/* <CardImg src='https://picsum.photos/200'/> */}
        </MidWrraper>
        // </SectionWrraper>
    )
};

export default SignUp;