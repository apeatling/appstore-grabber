import React from 'react';
import IsMobile from 'is-mobile';

import Spinner from '../Spinner/Spinner';
import CancelButton from '../CancelButton/CancelButton';
import AppIconHolder from '../AppIconHolder/AppIconHolder';
import * as constants from '../../constants.js';

import ('./SearchBar.css');

class SearchBar extends React.Component {
	state = {
		term: ''
	}

	componentDidMount() {
		window.addEventListener('keyup', this.onWindowKeyUp);
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.onWindowKeyUp);
	}

	componentDidUpdate() {
		if ( this.props.selectedApp && this.state.term !== this.props.selectedApp.name ) {
			this.setState({ term: this.props.selectedApp.name });
		}

		if ( 0 === this.props.focusTabIndex ) {
			// Timeout to ensure caret is placed at end of text.
			setTimeout( () => {
				this.searchInput.focus();
			}, 10 );
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

	onInputFocus = e => {
		document.body.scrollTop = 0;
	}

	onCancelButtonClick = () => {
		// Delay to ensure reset of the input value crossbrowser
		setTimeout( () => {
			this.setState({ term: '' });
		}, 10 );

		this.clearForm();
		this.props.onCancelButtonClick();
	}

	onWindowKeyUp = e => {
		const charCode = e.keyCode || e.which;
		
		if ( charCode !== constants.ESC_KEY ) {
			return;
		}

		this.onCancelButtonClick();
	}

	submitForm = () => {
		if ( this.state.term.length > 0 ) {
			this.activateForm();

			if ( IsMobile({ tablet: true }) && !document.body.classList.contains('listing-apps') ) {
				this.searchInput.blur();
			}
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
		if ( !this.props.selectedApp ) {
			return;
		}

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
						tabIndex={0}
						type="text"
						value={this.state.term}
						onChange={this.onInputChange}
						onFocus={this.onInputFocus}
						ref={(input) => { this.searchInput = input; }}
						placeholder="Search for an App..."
						spellCheck="false"
						autoCorrect="off"
						autoCapitalize="none"
						readOnly={this.props.selectedApp ? true : false}
						autoFocus
					/>

					{this.renderSpinner()}
					{this.renderCancelButton()}
				</form>
			</div>
		);
	}
}

export default SearchBar;