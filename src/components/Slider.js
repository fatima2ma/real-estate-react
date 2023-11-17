import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Pagination, Navigation, EffectFade, Autoplay, A11y } from 'swiper/modules';
import { FaShare } from 'react-icons/fa6';

const Slide = styled.div`
    width: 100%;
    height: 300px;
    position: relative;
    overflow: hidden;
`;

const ShareIcon = styled.div`
    width: calc(100% - 80px);
    height: calc(100% - 40px);
    background: transparent;
    color: #333;
    text-align: end;
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    z-index:100;

    &.shared:before{
        display: inline-block;
        content:'Copied to clipboard';
        width: max-content;
//        height: 35px;
        background: #eee;
//        position: absolute;
//        top: 50px;
//        left: 50%;
        padding: 0.5rem 1rem;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        margin: 0 0.6rem;
        box-shadow: 0 0 2px 2px #eee;
    }
`;

const IconWrapper = styled.span`
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 43px;
    background: #eee;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 1px #eee;
//    position: relative;

//    &.shared:before{
//        content:'Copied to clipboard';
//        width: max-content;
////        height: 35px;
//        background: #eee;
//        position: absolute;
//        top: 50px;
//        left: 50%;
//        padding: 0 0.5rem;
//        text-align: center;
//        font-size: 12px;
//    }
`;

function Slider({data, sharedIcon}){
    const [shared, setShared] = useState(false);
    return(
        <Swiper
            pagination={{type: 'progressbar',}}
            navigation={true}
            autoplay={{delay: 3000,
                        disableOnInteraction: false,
                    }}
            modules={[Pagination, Navigation, Autoplay, A11y]}
            dir='ltr'
        >
        {sharedIcon && 
        <ShareIcon>
            <IconWrapper onClick={(e)=>{
                navigator.clipboard.writeText(window.location.href);
                setShared(true);
                console.log(e.target.parentNode);
                e.target.parentNode.classList.add('shared');
                setTimeout(()=>{setShared(false); e.target.parentNode.classList.remove('shared');},800);
            }}>
                <FaShare/>
            </IconWrapper>
            
        </ShareIcon>}
        {data && data.map((imageURL, index) => (
            <SwiperSlide key={index}>
                <Slide style={{background: `url(${imageURL}) center no-repeat`, backgroundSize: "cover",}}>
                </Slide>
            </SwiperSlide>
        ))}
        </Swiper>
    )
}

export default Slider;