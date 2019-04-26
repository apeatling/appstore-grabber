import React from 'react';
import AppStoreItem from './AppStoreItem';
import ('./AppStoreListing.css');

const AppStoreListing = (props) => {
	const apps = props.apps.map((app) => {
		return <AppStoreItem app={app} key={app.key} />
	});

	return (
		<div className="appstore-listing">
			<ul>
				{apps}
			</ul>
		</div>
	);
}

export default AppStoreListing;