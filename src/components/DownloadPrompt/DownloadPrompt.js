import React from 'react';
import ('./DownloadPrompt.css')

const DownloadPrompt = (props) => {
	return (
		<div className="download-prompt">
			{props.children}

			<a className="button download" href="">Download</a> <span className="or">or</span>  
			<a className="full-preview" href="" target="_blank">Preview Full Size</a>
		</div>
	);
};

export default DownloadPrompt;