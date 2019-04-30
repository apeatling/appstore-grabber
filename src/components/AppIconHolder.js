import React from 'react';
import ('./AppIconHolder.css');

class AppIconHolder extends React.Component {
	renderAppIcon() {
		if ( ! this.props.selectedApp ) {
			return;
		}

		// Wait so that css transitions work
		const { iconURL, name } = this.props.selectedApp;
		return (
			<img src={iconURL} alt={name} width="32" height="32" />
		);
	}

	render() {
		return (
			<div className="app-icon-holder">
				{this.renderAppIcon()}
			</div>
		);
	}
};

export default AppIconHolder;