import React from 'react';
import AppStore from '../api/AppStore';
import SearchBar from './SearchBar/SearchBar';
import AppStoreListing from './AppStoreListing/AppStoreListing';
import AppStorePage from './AppStorePage/AppStorePage';

class App extends React.Component {
	state = {
		apps: [],
		selectedApp: null,
		isLoading: false
	}

	onSearchSubmit = async (term) => {
		this.setState( {
			isLoading: true, 
			selectedApp: null
		});

		const response = await AppStore.get( '/', {
			params: {
				term: term,
				media: 'software'
			}
		});

		const apps = response.data.results.map((app) => {
			return {
				key: app.trackId,
				iconURL: app.artworkUrl100.replace('100x100', '150x150'),
				name: app.trackName,
				creator: app.artistName
			};
		});

		setTimeout( () => {
			this.setState({ apps, isLoading: false });
		}, ( term.length === 0 ? 0 : 1000 ) );
	}

	onAppClick = (app) => {
		this.setState({ selectedApp: app });

		setTimeout( () => {
			this.setState({ apps: [] });
		}, 1000 );
	}

	onCancelButtonClick = () => {
		this.setState( {
			apps: [],
			selectedApp: null,
			isLoading: false
		});
	}

	getClassName() {
		let className = 'app';

		if ( this.state.apps.length ) {
			className += ' has-apps-listed';
		} else {
			className += ' no-apps-listed';
		}

		if ( this.state.selectedApp ) {
			className += ' selected-app';
		}

		return className;
	}
	
	renderPage() {
		if ( this.state.apps.length > 0 ) {
			return (
				<AppStoreListing 
					onAppClick={this.onAppClick}
					apps={this.state.apps}
				/>
			);
		}

		if ( !this.state.apps.length && this.state.selectedApp ) {
			return(
				<AppStorePage
					appID={this.state.selectedApp.key}
					title="Here's your App Store page!"
					prompt="Download this page using the button below and then make adjustments to it. You can use your adjusted page to run split tests and optimize your conversion rate."
				/>
			);
		}
	}

	render() {
		return (
			<div className={this.getClassName()}>
				<SearchBar 
					onSearchSubmit={this.onSearchSubmit}
					onCancelButtonClick={this.onCancelButtonClick}
					isLoading={this.state.isLoading} 
					selectedApp={this.state.selectedApp}
				/>

				{this.renderPage()}
			</div>
		);
	}
}

export default App;