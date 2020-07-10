import React from 'react';
import styled from 'styled-components';
import Field from './Field';

const Form = styled.form`
	padding: 2rem;
	display: grid;
	grid-row-gap: 1rem;
`;

const Button = styled.button`
	width: 100%;
	outline: none;
	padding: 10px;
	border-radius: 10px;
	font-size: 1.2rem;
	color: white;
	font-weight: 700;
	box-shadow: 0 0 px black;
	background-color: #03bafc;
	border: none;
	transition: all 0.2s;
	&:hover {
		transform: translateY(-3px);
	}
	&:active {
		transform: translateY(2px);
	}
	&:disabled {
		cursor: not-allowed;
		background-color: grey;
	}
`;

class Login extends React.Component {
	state = {
		fields: {
			name: '',
			email: ''
		},
		fieldsErrors: {},
		users: []
	}

	validate = () => {
		const person = {...this.state.fields};
		const fieldsErrors = {...this.state.fieldsErrors};
		const errorMessages = Object.keys(fieldsErrors).filter(error => fieldsErrors[error]);
		if(!person.name) return true;
		if(!person.email) return true;
		if(errorMessages.length) return true;

		return false
	}

	isEmail = (email) => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(email)) {
			return true
		}
		return false
	}

	onInputChange = ({ name, value, error}) => {
		const fields = {...this.state.fields};
		const fieldsErrors = {...this.state.fieldsErrors};

		fields[name] = value;
		fieldsErrors[name] = error
		this.setState({
			...this.state,
			fields,
			fieldsErrors
		})
	}

	handleSubmit = (event) => {
		const fields  = {...this.state.fields};
		const people = [...this.state.users, fields];
		event.preventDefault();
		if(this.validate()) return;
		alert(`
			Hello ${this.state.fields.name}.
			You Logged in with ${this.state.fields.email} email
		`);
		
		this.setState({
			users: people,
			fields: {
				name: '',
				email: ''
			}
		})
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Field 
					type="text"
					name="name"
					placeholder="Name"
					value={this.state.fields.name}
					onChange={this.onInputChange}
					validate={value => value ? false : 'Name Is Required!'}
				/>
				<Field 
					type="email"
					name="email"
					placeholder="Email"
					value={this.state.fields.email}
					onChange={this.onInputChange}
					validate={value => this.isEmail(value) ? false : 'Email Is Required'}
				/>
				<Button 
					type="submit"
					disabled={this.validate()}
				>Submit</Button>
			</Form>		
		);
	}
}

export default Login;