import React from 'react';
import AppStore from '../api/AppStore';
import SearchBar from './SearchBar/SearchBar';
import AppStoreListing from './AppStoreListing/AppStoreListing';
import AppStorePage from './AppStorePage/AppStorePage';

class App extends React.Component {
	state = {
		apps: [],
		selectedApp: null,
		isLoading: false,
		focusTabIndex: 0
	}

	appListingTimeout = null
	selectedAppTimeout = null

	onSearchSubmit = async (term) => {
		this.setState( {
			isLoading: true, 
			selectedApp: null,
			focusTabIndex: 0
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

		this.appListingTimeout = setTimeout( () => {
			if ( apps.length > 0 ) {
				document.body.classList.add('listing-apps');
			}

			this.setState({ apps, isLoading: false });
		}, ( term.length === 0 ? 0 : 1000 ) );
	}

	onAppClick = (app) => {
		document.body.classList.add('selected-app');
		this.setState({ selectedApp: app });

		this.selectedAppTimeout = setTimeout( () => {
			document.body.classList.remove('listing-apps');
			this.setState({ apps: [] });
		}, 1000 );
	}

	onAppMouseEnter = (tabIndex) => {
		this.setState({ focusTabIndex: tabIndex });
	}

	onAppKeyDown = e => {
		if ( this.state.apps.length < 1 ) {
			return;
		}

		const charCode = e.keyCode || e.which;
		
		// 38 == up arrow, 40 == down arrow
		if ( charCode !== 38 && charCode !== 40 ) {
			return;
		}

		// Arrow up
		if ( charCode === 38 ) {
			if ( this.state.focusTabIndex === 0 ) {
				return;
			}

			this.setState({ 
				focusTabIndex: (this.state.focusTabIndex - 1)
			});
		}

		// Arrow down
		if ( charCode === 40 ) {
			if ( this.state.focusTabIndex === (this.state.apps.length - 1) ) {
				return;
			}

			this.setState({ 
				focusTabIndex: (this.state.focusTabIndex + 1)
			});
		}
	}

	onAppKeyUp = e => {
		const charCode = e.keyCode || e.which;
		
		// Esc Key
		if ( charCode !== 27 ) {
			return;
		}

		document.body.classList.remove('searching');
		document.body.classList.add('waiting');

		this.onCancelButtonClick();
	}

	onCancelButtonClick = () => {
		clearTimeout(this.appListingTimeout);
		clearTimeout(this.selectedAppTimeout);

		document.body.classList.remove('listing-apps', 'selected-app');

		this.setState( {
			apps: [],
			selectedApp: null,
			isLoading: false,
			focusTabIndex: 0
		});
	}

	renderPage() {
		if ( this.state.apps.length > 0 ) {
			return (
				<AppStoreListing 
					onAppClick={this.onAppClick}
					apps={this.state.apps}
					focusTabIndex={this.state.focusTabIndex}
					onAppMouseEnter={this.onAppMouseEnter}
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
			<div 
				className="app"
				onKeyDown={this.onAppKeyDown}
				onKeyUp={this.onAppKeyUp}
			>
				<img src={'/images/logo.png'} alt="App Store Page Grabber" className="logo" />

				<SearchBar 
					onSearchSubmit={this.onSearchSubmit}
					onCancelButtonClick={this.onCancelButtonClick}
					isLoading={this.state.isLoading} 
					selectedApp={this.state.selectedApp}
					focusTabIndex={this.state.focusTabIndex}
				/>

				{this.renderPage()}
			</div>
		);
	}
}

export default App;