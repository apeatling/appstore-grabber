import React from 'react';
import ('./AppStoreItem.css');

class AppStoreItem extends React.Component {
	state = {
		iconIsLoaded: false,
		cssTop: 0
	}

	constructor(props) {
		super(props);

		this.itemRef = React.createRef();
	}

	componentDidUpdate() {
		if ( this.props.shouldFocus ) {
			this.itemRef.current.focus();
		}
	}

	onAppClick = e => {
		e.preventDefault();
		this.props.onAppClick(this.props.app);

		const headerHeight = 117;
		this.itemRef.current.style.top = '-' + this.itemRef.current.offsetTop - headerHeight + window.pageYOffset + 'px';
	}

	onAppMouseEnter = e => {
		this.props.onAppMouseEnter(this.props.tabIndex);
		this.itemRef.current.focus();
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
			<li ref={this.itemRef} 
				className={`appstore-item ${this.props.className}`}
				onClick={this.onAppClick}
				tabIndex={this.props.tabIndex}
				onMouseEnter={this.onAppMouseEnter}
			>
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