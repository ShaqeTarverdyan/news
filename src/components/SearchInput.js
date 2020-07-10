import React from 'react';
import styled from 'styled-components';
import { SEARCH_ARTICLES_URL } from '../Constants';
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";


const Container = styled.div`
	display: flex;
	height: 35px;
	border: 1px solid lightgrey;
	border-radius: 5px;
	justify-content: space-between
`;
const Input = styled.input`
	padding: 0 10px;
	border: none;
	outline: none
`;

const Button = styled.div`
	border: none;
	height: 37px;
	align-items: center;
    display: flex;
    margin: 0 10px;
`;

class SearchInput extends React.Component {
	state = {
		searchValue: '',
	}

	handleSubmit = () => {
		this.setState({searchValue:''});
	}

	handleChange = event => {
		this.setState({searchValue: event.target.value})
	}

	render() {
		return (
			<Container>
				<Input 
					type="text"
					value={this.state.searchValue}
					placeholder="Search..."
					onChange={this.handleChange}
				/>
				<Button type="submit" onClick={this.handleSubmit}>
					<Link  to={`/Search/${this.state.searchValue}`} style={{textDecoration: 'none'}}>
						<AiOutlineSearch/>
					</Link>
				</Button>
			</Container>
		);
	}
}

export default SearchInput;