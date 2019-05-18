import React from 'react';
import AppStoreItem from '../AppStoreItem/AppStoreItem';
import ('./AppStoreListing.css');

class AppStoreListing extends React.Component {
	state = {
		selectedApp: null,
	}

	onAppClick = (app) => {
		this.setState( { selectedApp: app } );
		this.props.onAppClick(app);
	}

	renderApps() {
		return this.props.apps.map((app, i) => {
			let className = "";
			let shouldFocus = false

			if ( (i + 1) === this.props.focusTabIndex ) {
				shouldFocus = true;
			}

			if ( this.state.selectedApp ) {
				if ( app === this.state.selectedApp ) {
					className += " selected";
				} else {
					className += " hide";
				}
			}

			return <AppStoreItem 
						tabIndex={i+1}
						app={app} 
						key={app.key} 
						onAppClick={this.onAppClick}
						className={className}
						shouldFocus={shouldFocus}
						onAppMouseEnter={this.props.onAppMouseEnter}
					/>
		});
	}

	render() {
		return (
			<div className="appstore-listing">
				<ul>
					{this.renderApps()}
				</ul>
			</div>
		);
	}
}

export default AppStoreListing;