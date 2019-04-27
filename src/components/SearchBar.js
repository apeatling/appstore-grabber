import React from 'react';
import Spinner from './Spinner';
import AppIconHolder from './AppIconHolder';

import ('./SearchBar.css');

class SearchBar extends React.Component {
	state = {
		term: ''
	}

	componentDidMount() {
		this.searchInput.focus();
	}

	componentDidUpdate() {
		this.searchInput.focus();		
	}

	onFormSubmit = e => {
		e.preventDefault();

		this.submitForm();
	}

	onInputChange = e => {
		this.setState({ term: e.target.value });
		clearTimeout( window.timeout );

		if ( e.target.value.length < 1 ) {
			document.body.classList.remove('searching');
			document.body.classList.add('waiting');
			
			this.props.onSubmit('');
			
			return;
		}

		window.timeout = setTimeout(
			this.submitForm, 1000
		);
	}

	renderSpinner() {
		if ( this.props.isLoading ) {
			return <Spinner />
		}
	}

	renderAppIconHolder() {
		return <AppIconHolder />
	}

	submitForm = () => {
		if ( this.state.term.length > 0 ) {
			document.body.classList.add('searching');
			document.body.classList.remove('waiting');
		}

		this.props.onSubmit(this.state.term);
	}

	render() {
		return (
			<div className="search-bar">
				<form onSubmit={this.onFormSubmit}>
					{this.renderAppIconHolder()}

					<input 
						type="text"
						value={this.state.term}
						onChange={this.onInputChange}
						ref={(input) => { this.searchInput = input; }}
						placeholder="Search for an App..."
						spellCheck="false"
						autoCorrect="off"
						autoCapitalize="none"
					/>

					{this.renderSpinner()}
				</form>
			</div>
		);
	}
}

export default SearchBar;