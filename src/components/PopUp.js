import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from "react-icons/ai";

const ClosedPopup = styled.div`
	padding: 1rem;
	text-align: center;
	position: absolute;
	z-index: 2;
	opacity: 0;
	background-color: white;
	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
	transform: translate3d(100%, 0, 0);
    transition-duration: 192ms;
    transition-property: opacity, transform, visibility;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
    visibility: hidden;
    position: fixed;
	top: 0;
	left: 0;
	width:100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
`;

const OpenedWrapper = styled(ClosedPopup)`
	opacity: 1;
    transform: translate3d(0, 0, 0);
    transition-duration: 224ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    visibility: visible;
`;

const Content = styled.div`
	position:fixed;
	background: white;
	width: 50%;
	height: auto;
	border: 1px solid lightgrey;
	border-radius: 10px;
	top:50%;
	left:50%;
	transform: translate(-50%,-50%);
`

const CloseIcon = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    font-size: 1rem;
    color: grey;
    cursor: pointer;

    @media (min-width: 768px) {
    	font-size: 2rem;
    }	

`;

const PopUp = ({ isOpen, title, children, handleClosePopUp }) => {
	const Wrapper = isOpen ? OpenedWrapper : ClosedPopup;
	return (
		<Wrapper isOpen={isOpen}>
			<Content>
				<CloseIcon onClick={handleClosePopUp}>
					<AiOutlineClose/>
				</CloseIcon>
				<p>{title}</p>
				{children}
			</Content>
		</Wrapper>
	)
}


export default PopUp;