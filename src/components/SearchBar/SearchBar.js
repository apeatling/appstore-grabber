import React from 'react';
import Spinner from '../Spinner/Spinner';
import CancelButton from '../CancelButton/CancelButton';
import AppIconHolder from '../AppIconHolder/AppIconHolder';

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

		if ( this.props.selectedApp && this.state.term !== this.props.selectedApp.name ) {
			this.setState({ term: this.props.selectedApp.name });
		}
	}

	onSearchSubmit = e => {
		e.preventDefault();

		this.submitForm();
	}

	onInputChange = e => {		
		this.setState({ term: e.target.value });
		clearTimeout( window.timeout );

		if ( e.target.value.length < 1 ) {
			this.onCancelButtonClick()

			return;
		}

		window.timeout = setTimeout(
			this.submitForm, 1000
		);
	}

	onCancelButtonClick = () => {
		this.setState({ term: '' });
		this.clearForm();

		this.props.onCancelButtonClick()
	}

	submitForm = () => {
		if ( this.state.term.length > 0 ) {
			this.activateForm();
		}

		this.props.onSearchSubmit(this.state.term);
	}

	activateForm() {
		document.body.classList.add('searching');
		document.body.classList.remove('waiting');
	}

	clearForm() {		
		document.body.classList.remove('searching');
		document.body.classList.add('waiting');
	}

	renderSpinner() {
		if ( this.props.isLoading ) {
			return <Spinner />
		}
	}

	renderCancelButton() {
		if ( !this.props.selectedApp ) return;

		return <CancelButton onCancelButtonClick={this.onCancelButtonClick} />
	}

	renderAppIconHolder() {
		return <AppIconHolder selectedApp={this.props.selectedApp} />
	}

	render() {
		return (
			<div className='search-bar'>
				<form onSubmit={this.onSearchSubmit}>
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
						readOnly={this.props.selectedApp ? true : false}
					/>

					{this.renderSpinner()}
					{this.renderCancelButton()}
				</form>
			</div>
		);
	}
}

export default SearchBar;