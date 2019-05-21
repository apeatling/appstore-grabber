import React from 'react';
import * as constants from '../../constants.js';
import ('./AppStoreItem.css');

class AppStoreItem extends React.Component {
	state = {
		iconIsLoaded: false,
		cssTop: 0
	}

	constructor(props) {
		super(props);

		this.itemRef = React.createRef();
	}

	componentDidUpdate() {
		if ( this.props.shouldFocus ) {
			this.itemRef.current.focus();
		}
	}

	onAppClick = e => {
		e.preventDefault();
		this.props.onAppClick(this.props.app);
		this.selectApp();
	}

	onAppMouseEnter = e => {
		this.props.onAppMouseEnter(this.props.tabIndex);
		this.itemRef.current.focus();
	}

	onAppKeyUp = e => {
		const charCode = e.keyCode || e.which;
		
		// Return Key
		if ( charCode !== constants.RETURN_KEY ) {
			return;
		}

		this.props.onAppClick(this.props.app);
		this.selectApp();
	}

	onIconLoad = e => {
		this.setState({ iconIsLoaded: true });
	}

	selectApp() {
		const headerHeight = 117;
		this.itemRef.current.style.top = '-' + this.itemRef.current.offsetTop - headerHeight + window.pageYOffset + 'px';		
	}

	getIconClassName() {
		if ( this.state.iconIsLoaded ) {
			return 'loaded';
		}

		return '';
	}

	render() {
		const { iconURL, name, creator } = this.props.app;

		return (
			<li ref={this.itemRef} 
				className={`appstore-item ${this.props.className}`}
				onClick={this.onAppClick}
				onMouseEnter={this.onAppMouseEnter}
				onKeyUp={this.onAppKeyUp}
				tabIndex={this.props.tabIndex}
			>
				<span className="icon">
					<img src={iconURL} alt={name} width="50" height="50" onLoad={this.onIconLoad} className={this.getIconClassName()} /> 
				</span>

				<h2>{name}</h2>
				<p>by {creator}</p>
			</li>
		);
	}
}

export default AppStoreItem;