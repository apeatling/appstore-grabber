import React from 'react';
import ('./DownloadPrompt.css')

const DownloadPrompt = (props) => {
	return (
		<div className="download-prompt">
			{props.children}

			<button>Download</button>
		</div>
	);
};

export default DownloadPrompt;