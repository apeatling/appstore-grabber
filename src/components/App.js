import React from 'react';
import AppStore from '../api/AppStore';
import SearchBar from './SearchBar/SearchBar';
import AppStoreListing from './AppStoreListing/AppStoreListing';
import PhonePreview from './PhonePreview/PhonePreview';

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

	renderAppStoreListing() {
		
	}
	
	renderPage() {
		if ( this.state.apps.length > 0 ) {
			return( 
				<AppStoreListing 
					onAppClick={this.onAppClick}
					apps={this.state.apps}
				/>
			);
		}

		if ( !this.state.apps.length && this.state.selectedApp ) {
			return(
				<PhonePreview frameURL={`http://appstore.local:8888/appstore.php?id=${this.state.selectedApp.key}`} />
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
				{this.renderAppStoreListing()}
			</div>
		);
	}
}

export default App;