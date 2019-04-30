import React from 'react';
import AppStore from '../api/AppStore';
import SearchBar from './SearchBar';
import AppStoreListing from './AppStoreListing';

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
		this.setState( { selectedApp: app });
	}

	onCancelButtonClick = () => {
		this.setState( {
			apps: [],
			selectedApp: null,
			isLoading: false
		});
	}

	renderAppStoreListing() {
		if ( this.state.apps.length > 0 ) {
			return( 
				<AppStoreListing 
					onAppClick={this.onAppClick}
					apps={this.state.apps}
				/>
			);
		}
	}

	render() {
		return (
			<div className="app">
				<SearchBar 
					onSearchSubmit={this.onSearchSubmit}
					onCancelButtonClick={this.onCancelButtonClick}
					isLoading={this.state.isLoading} 
					selectedApp={this.state.selectedApp}
				/>
				
				{this.renderAppStoreListing()}
			</div>
		);
	}
}

export default App;