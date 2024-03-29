import styled from 'styled-components';
import { useContext, useState } from 'react';
import FormItem from '../../components/FormItem';
import SectionWrraper from '../../components/SectionWrraper';
import Wrraper2col from '../../components/Wrraper2col';
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

function ForgotPassword(){
    const [email, setEmail] = useState('');
    const {updatePassword} = useContext(AuthContext);
    
    function onChange(e){
        setEmail(e.target.value);
    };
    
    function onSubmit(e){
        e.preventDefault();
        updatePassword(email);
    }
    
    return(
        <SectionWrraper classStyle='shadow'>
        <Wrraper2col>
        <Form onSubmit={onSubmit}>
            <SectionHeader title='Forgot Password' subTitle='please write the required information'/>
            <FormItem onChange={onChange} title='User Email' type='email' placeholder='write yor email please...' lbl='email'/>
            <LinkSt to='../signin'>SignIn</LinkSt>
            <Button type='submit' title='Reset'/>
        </Form>
        <CardImg src='https://picsum.photos/200'/>
        </Wrraper2col>
        </SectionWrraper>
    )
};

export default ForgotPassword;