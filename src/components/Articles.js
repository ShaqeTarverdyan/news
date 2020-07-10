import React from 'react';
import styled from 'styled-components';
import { GET_ARTICLES_URL, SEARCH_ARTICLES_URL }from '../Constants';
import ArticleCard from './ArticleCard';
import { Link } from "react-router-dom";
import Loader from './Loader';

const Container = styled.div`
	width: 90%;
	margin: 0 auto;
	text-align: center;
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: 1fr;
`;

class Articles extends React.Component {
	state = {
		status: '',
		error: null
	}

	fetchArticles = () => {
		const matchedUrl = this.props.matchedUrl.replace("/", "").split("/")[0];
		let url = matchedUrl === 'Search' ?  SEARCH_ARTICLES_URL : GET_ARTICLES_URL;
		let endPoint =  matchedUrl === 'Search' ?  "&q=" : "&sources=";
		this.props.pathName ? 
			url += endPoint + this.props.pathName : 
			url += "&category=" + "general";		
		try {
		    fetch(url)
		      .then(res => res.json())
		      .then(res => {
		      	console.log('ress', res)
		      	this.props.onArticlesChange(res.articles);
		      	this.setState({status: res.status})
		      })
		  } catch(error) {
		  	this.setState({error: error.message})
		  }
	}

	componentDidMount() {
	    this.fetchArticles();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.pathName !== this.props.pathName) {
			this.fetchArticles();
		}
	}

	render() {
		
		if(this.state.error) return <Container>{this.state.error}</Container>
		if(this.props.articles === null) return <Loader/>

		return (
			<Container>
				{
					this.state.status === "ok" && this.props.articles.length === 0 ?
					<div>Result not Found :(</div> :
					this.props.articles.map(({ id, title, description, urlToImage }) => 
						<Link 
							key={id} 
							to={`/Article/${id}`} 
							style={{textDecoration: 'none', color: 'grey'}}
						>
							<ArticleCard 
								title={title}
								description={description}
								urlToImage={urlToImage}
							/>
						</Link>
					)
				}
			</Container>
		)
	}
}

export default Articles;