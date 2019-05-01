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
		return this.props.apps.map((app) => {
			let className = "";

			if ( this.state.selectedApp ) {
				if ( app === this.state.selectedApp ) {
					className = "selected";
				} else {
					className = "hide";
				}
			}

			return <AppStoreItem 
						app={app} 
						key={app.key} 
						onAppClick={this.onAppClick}
						className={className}
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