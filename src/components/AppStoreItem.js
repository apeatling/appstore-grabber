import React from 'react';
import ('./AppStoreItem.css');

class AppStoreItem extends React.Component {
	state = {
		iconIsLoaded: false
	}

	onAppClick = e => {
		e.preventDefault();
		this.props.onAppClick(this.props.app);
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
			<li className="appstore-item" onClick={this.onAppClick}>
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