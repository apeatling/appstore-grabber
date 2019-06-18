import React from 'react';
import ('./PhonePreview.css')

class PhonePreview extends React.Component {
	render() {
		return (
			<div className="phone-preview">
				<div className="iframe-holder">
				<iframe 
					title="page" 
					src={`${this.props.frameURL}&preview=1`}
				/>
				</div>
			</div>
		);
	}
};

export default PhonePreview;