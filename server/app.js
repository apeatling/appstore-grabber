document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById("device-compat").addEventListener("click", function(e) {
		document.body.classList.add("show-ipad");
	});

	var moreLinks = document.getElementsByClassName("more")
	for( var i = 0; i < moreLinks.length; i++) {
		moreLinks[i].addEventListener("click", function(e) {
			e.preventDefault();
			e.target.parentElement.classList.add("expand");
		});
	}

	var whatsNewSection = document.querySelector("#whats-new .desc");
	var descSection = document.getElementById("description");

	if ( whatsNewSection.clientHeight < 60 ) {
		whatsNewSection.classList.add("expand");
	}

	if ( descSection.clientHeight < 75 ) {
		descSection.classList.add("expand");
	}
});