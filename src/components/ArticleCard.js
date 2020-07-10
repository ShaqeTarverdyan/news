import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    padding: 1rem;
    border: 1px solid #03bafc;
    border-radius: 10px;
    column-gap: 1rem;

    :hover {
    	box-shadow: -2px -1px 13px 0px rgba(184, 182, 176, 0.75);
    }
`;

const Content = styled.div`
	display: grid;
    grid-template-columns: 200px auto;
    grid-column-gap: 1rem;
    text-align: justify;
    align-items: center;

    @media(min-width: 768px) {
    	grid-template-columns: 300px auto;
    }

`;
const Img = styled.img`
	width: 100%;
	background: lightgray;
	object-fit: contain;
	margin: auto;
`;

const H3 = styled.h3`
	font-size: 15px;
    line-height: 2rem;
`;
const P = styled.p`
	font-size: 15px;
    line-height: 1.3rem;
`;
const ArticleCard = ({ urlToImage, title, description}) => {
	return (
		<Container>
			<H3>{title}</H3>
			<Content>
				<Img src={urlToImage} alt={title} />
				<P>{description}</P>
			</Content>
		</Container>
	)
}

export default ArticleCard;