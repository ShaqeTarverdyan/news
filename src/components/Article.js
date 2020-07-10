import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 70%;
    margin: 0 auto;
    text-align: center;
    padding: 0 3rem;
    color: darkgray;
`;

const Title = styled.p`
	font-size: x-large;
    line-height: 4rem;
    font-weight: bold;
`;

const Content = styled.div`
	font-size: inherit;
	line-height: 1.5rem;
`;
const PublishInfo = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 2rem;
`;
class Article extends React.Component {
	render() {
		const {author, title, publishedAt, content} = this.props;
		return(
			<Container>
				<Title>{title}</Title>
				<Content>{content}</Content>
				<PublishInfo>
					<span>{author}</span>
					<span>{publishedAt}</span>
				</PublishInfo>
			</Container>
		)
	}
}

export default Article;