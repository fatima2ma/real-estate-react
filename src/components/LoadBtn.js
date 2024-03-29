import styled from "styled-components";

function LoadBtn(){
    return(
        <svg width='40' height='40'>
			<circle cx='20' cy='20' r='15' fill="none" stroke='#fff' stroke-width='5' stroke-linecap='round' stroke-dasharray='125' stroke-dashoffset='125'>
				<animate attributeType='CSS' attributeName='stroke-dashoffset' repeatCount='indefinite' dur='5s' values='125;0;250;125'/>
			</circle>
		</svg>
    )
}

export default LoadBtn;