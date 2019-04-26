import React from 'react';
import ('./AppStoreItem.css');

class AppStoreItem extends React.Component {
	state = {
		iconIsLoaded: false
	}

	onSelect = e => {
		e.preventDefault();

		console.log(this.props.app)
	}

	onIconLoad = e => {
		this.setState({ iconIsLoaded: true });
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
			<li className="appstore-item" onClick={this.onSelect}>
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