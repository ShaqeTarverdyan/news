import React from 'react';
import styled from 'styled-components';

const FieldWrapper = styled.div`
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;

    @media (min-width: 768px) {
    	width: 100%
    }
`;
const ErrorMessage = styled.span`
	color: red;
	font-size: 12px;
`;


class Field extends React.Component {
	state = {
		value: this.props.value,
		error: null
	}

	componentWillReceiveProps(update) {
	    this.setState({ value: update.value });
	}

	handleChange = event => {
	 	const name = this.props.name;
	    const value = event.target.value;
	    const error = this.props.validate ? this.props.validate(value) : false;
	    this.setState({ value, error });

	    this.props.onChange({ name, value, error });
	}

	render() {
		const { type, name, placeholder} = this.props;
		return (
			<FieldWrapper>
				<Input 
					type={type}
					name={name}
					value={this.state.value}
					placeholder={placeholder}
					onChange={this.handleChange}
				/>
				<ErrorMessage>{this.state.error}</ErrorMessage>
			</FieldWrapper>
		);
	}
}

export default Field;