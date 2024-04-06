import styled from 'styled-components';
import { useContext, useState, useRef, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import FormItem from '../../components/FormItem';
import SectionWrraper from '../../components/SectionWrraper';
import Wrraper2col from '../../components/Wrraper2col';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import LoadBtn from '../../components/LoadBtn';

const Form = styled.form`
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    text-align: start;
    grid-row: 1;
    grid-column: 1 / 2;
    z-index: 2;
`;

const LinkSt = styled(Link)`
    align-self: end;
    font-size: 14px;
    font-weight: bold;
    color: #276ce7;
`;

const WrapTrans = styled.div`
    grid-row: 1;
    grid-column: 1 / end;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;

    & .intro{
        margin: auto 0;
        padding: 0rem 2rem 4rem 2rem;
        width: fit-content;
        color: #fff;
        align-self: end;
        max-width: 240px;
        z-index: 2;
        @media (max-width: 840px){
            display: none;
        }
        

        & .subtitle{
            font-size: 2rem;
            color: #2b77ff;
            transform: translateX(0px);
            opacity: 1;
            transition: all 1.1s ease, opacity .6s ease;
            filter: blur(0);
        }
        & .desc{
            padding: 0.4rem;
            transform: translateX(0px);
            opacity: 1;
            transition: all 1.5s ease, opacity .8s ease;
            filter: blur(0);
        }
    }

    &.active{
        z-index:2;
        & .intro.dsiplayNone{
            display:none;
        }
        & .intro .subtitle{
            transform: translateX(300px);
            filter: blur(1.5px);
            opacity:0;
        }
        & .intro .desc{
            transform: translateX(300px);
            filter: blur(1.5px);
            opacity:0;
        }
    }    
`;

const CardImg = styled.div`
    height: 160%;
    width: 160%;
    transition: all 1s ease;
    background: #222;
    transform: rotate(64deg);
    left: 13%;
    bottom: 40%;
    position: absolute;
    box-shadow: 1px 1px 0px 15px #276ce7;
    border-radius: 50%;
    display: flex;
    align-items: center;

    @media (max-width: 840px){
        left: 35%;
        bottom: 75%;
    }
    @media (max-width: 676px){
        left: 55%;
        bottom: 60%;
    }

    & .feedBack{
        height: fit-content;
        width: 70%;
        justify-content: center;
        margin: 1rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: #e1e1e1;
        overflow: hidden;
        
        @media (max-width: 840px){
            text-align: center;
        }
        & > *{
            transition: all 1.5s ease;
            transform: translateY(1000px);
            opacity: 0;
        }
        &.failed > *{
           text-shadow: 2px 2px 1px #8f0101; 
        }
        &.success > *{
            text-shadow: 2px 2px 1px green; 
        }
        & .whiteLink{
            color: #e1e1e1;
            text-shadow: none;
            text-decoration: underline;
        }
    }

    &.active{
        height: 100%;
        width: 100%;
        transform: rotate(0deg);
        left: 0%;
        bottom: 0%;
        border-radius: 5px;
        box-shadow: 1px 1px 0px 0px transparent;

        & .feedBack > *{
            transform: translateY(0px);
            opacity: 1;
        }
    }
`;

const Texts = styled.div`
    
`;

function ForgotPassword(){
    const activeCard = useRef(null);
    const wrapActive = useRef(null);
    const isDisplayed = useRef(null);
    const [logging, setLogging] = useState(false);
    const navigate   = useNavigate();
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const {updatePassword, updated, setUpdated} = useContext(AuthContext);
    
    useEffect(()=>{
        auth.currentUser && navigate('/');
        if(updated != 'bending')       
            !updated && retryProcess();
    },[updated])

    function onChange(e){
        setEmail(e.target.value);
    };
    
    function onSubmit(e){
        e.preventDefault();
        setLogging(true);
        activeCard.current.classList.add('active');
        wrapActive.current.classList.add('active');
        setTimeout(() => {
            isDisplayed && isDisplayed.current.classList.add('dsiplayNone');
        }, 1000);
        updatePassword(email);
    }

    function retryProcess(){
        const timeout1 = setTimeout(()=> {
            wrapActive.current.classList.remove('active');
            setUpdated('bending');
            setLogging(false);
        }, '3500');
        const timeout2 = setTimeout(()=> {
            activeCard.current.classList.remove('active');
            isDisplayed && isDisplayed.current.classList.remove('dsiplayNone');
        }, '3000');
    }
    
    return(
        <SectionWrraper classStyle='shadow fixedWidth'>
        <Wrraper2col>
        <Form onSubmit={onSubmit}>
            <SectionHeader title='Forgot Password'/>
            <FormItem onChange={onChange} title='write your email to send a link to reset password' type='email' placeholder='write yor email please...' lbl='email'/>
            <LinkSt to='../signin'>or SignIn</LinkSt>
            <Button type='submit' disabled={logging} title='Reset'>{logging && <LoadBtn/>}</Button>
        </Form>
        <WrapTrans ref={wrapActive}>
                    <Texts className='feedBack intro' ref={isDisplayed}>
                        <h4 className='subtitle'>Don't worry</h4>
                        <p className='desc'>We will solve this with in a while. </p>
                    </Texts>
                    <CardImg ref={activeCard}>                        
                        {updated != 'bending' ?
                        updated == true?
                            <Texts className='feedBack success'>
                                <h4 className='subtitle'>Chick your email please!</h4>
                                <p className='desc'>we sended a link so you can reset your password.<br/>and sign in again <LinkSt className='whiteLink' to='../signin'>SignIn</LinkSt></p>                                
                            </Texts>
                        :
                            <Texts className='feedBack failed'>
                                <h4 className='subtitle'>Something went wrong</h4>
                                <p className='desc'>check your email and try again please</p>
                            </Texts> 
                        : <Texts className='feedBack failed'>
                            <h4 className='subtitle'></h4>
                            <p className='desc'><LoadBtn/></p></Texts> }
                    </CardImg>
                </WrapTrans>
        </Wrraper2col>
        </SectionWrraper>
    )
};

export default ForgotPassword;