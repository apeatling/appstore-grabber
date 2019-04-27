import React from 'react';
import ('./CancelButton.css')

class CancelButton extends React.Component {
	render() {
		return (
			<button className="cancel-button" onClick={this.props.onCancelButtonClick}></button>
		);
	}
};

export default CancelButton;