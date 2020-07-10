import React from 'react';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import { NavLink, Link } from "react-router-dom";
import { GET_SOURCES_URL } from '../Constants.js';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Loader from './Loader';

const Container = styled.div`
	@media (max-width: 767px) {
		grid-gap: 1rem;
	}

	display: grid;
	grid-template-columns: 1fr;
	width: 90%;
    margin: 0 auto;
	column-gap: 1rem;
	padding: 1rem 2rem;
	text-align: center;
    align-items: center;

	@media (min-width: 768px) and (max-width: 1100px) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media (min-width: 1101px) {
		grid-template-columns: 1fr auto 1fr 1fr;
	}
`;

const Logo = styled.div`
	text-align: center;
	@media (min-width: 768px) and (max-width: 1100px) {
		grid-row: 1;
		grid-column: 2/4;
	};

	@media (min-width: 1101px) {
		text-align: left
	}

`;

const UL = styled.ul`
	@media (max-width: 767px) {
		grid-gap: 1rem;
		display: grid;
		padding: 0;
	}
	display: flex;
	@media (min-width: 768px) and (max-width: 1100px) {
		grid-row: 2;
		grid-column: 1/3;
	}
`;

const LI = styled.li`
	@media (max-width: 767px) {
		border-bottom: 1px solid lightgray;
    	padding-bottom: 8px;
	}

	@media (min-width: 768px) and (max-width: 1000px) {
		font-size: small
	}

	list-style: none;
	padding: 0 10px;
	cursor: pointer;
	text-transform: capitalize;
`;

const SearchInputWrapper = styled.div`
	@media (min-width: 768px) and (max-width: 1100px) {
		grid-row: 2;
		grid-column: 3;
	}
`;

const PopupButton = styled.div`
	border: 1px solid #03bafc;
    height: 37px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: grey;
    background: white;
    font-size: 16px;
    padding: 0 10px;
    cursor: pointer;

    @media (min-width: 768px) and (max-width: 1100px) {
		grid-row: 2;
		grid-column: 4;
	}

	:hover {
    	opacity: 0.8;
    	color: #03bafc;
    	border: 1px solid grey;
    }
`;

const MobileMenuWrapper = styled.div`
	@media (min-width: 768px) {
		display: none
	}
`;

const DesktopMenuWrapper = styled.div`
	@media (max-width: 767px) {
		display: none
	}

	@media (min-width: 768px) and (max-width: 1100px) {
		grid-row: 2;
		grid-column: 1/3;
	}
`;

const ToggleMenu = styled.div`
	color: white;
    background: darkgray;
    padding: 10px ;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    :hover {
    	opacity: 0.8
    }
`;

class Header extends React.Component {
	state = {
		sources: [],
		isOpenMenu: false
	}

	fillItemsInState = (items) => {
		let count = 5;
		let ItemsArray = [];
		for(let i = 0; i < count; i++) {
			ItemsArray[i] = items[i]
		}
		return ItemsArray
	}

	getSourses = () => {
		let url = GET_SOURCES_URL;	
		try {
		    fetch(url)
		      .then(res => res.json())
		      .then(res => this.setState({
		      	sources: this.fillItemsInState(res.sources)
		      }))
		  } catch(error) {
		  	console.log(error.message)
		  }
	}

	componentDidMount() {
		this.getSourses()
	}

	menuList = () => {
		return (
		
			this.state.sources ?
			<UL>
				{
					this.state.sources.map(({ id, name }) => 
						<LI key={id}>
							<NavLink
								to={`/Source/${id}`}
								style={{
									textDecoration: 'none',
									color: 'grey',
									fontSize: '90%',
								}}
							>
								{name}
							</NavLink>
						</LI>
					)
				}
			</UL> :
			<Loader/>
		)
	}

	toggleMenu = () => {
	 	this.setState({
	 		isOpenMenu: !this.state.isOpenMenu
	 	})
	}

	render() {
		const { isOpenMenu } = this.state; 
		const toggleIcon = isOpenMenu ? <AiOutlineUp/> : <AiOutlineDown/>;
		return (
			<Container>
				<Logo>
					<Link 
						to="/" 
						style={{
							textDecoration: 'none', 
							color: '#03bafc',
						}}
					>
						<div>News</div>
					</Link>
				</Logo>
				<MobileMenuWrapper>
					<ToggleMenu onClick={this.toggleMenu}>
						<span>News Sources</span>
						<span>{toggleIcon}</span>
					</ToggleMenu> 
					{ isOpenMenu && this.menuList() }
				</MobileMenuWrapper>
				<DesktopMenuWrapper>
					{this.menuList()}
				</DesktopMenuWrapper>
				<SearchInputWrapper>
					<SearchInput/>
				</SearchInputWrapper>
				<PopupButton 
					onClick={this.props.hanleOpenPupUp}
					isOpenMenu={this.state.isOpenMenu}
				>Contuct Us</PopupButton>
			</Container>
		)
	}
}

export default Header;