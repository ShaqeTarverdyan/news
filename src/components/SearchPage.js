import React from 'react';
import Articles from './Articles';


class SearchPage extends React.Component {
	render() {
		return (
			<div>
				{this.props.articles.map(article => 
					console.log(article)
				)}
			</div>
		);
	}
}

export default SearchPage;