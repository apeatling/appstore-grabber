var appStoreTemplate = {
	domLoaded: function(e) {
		appStoreTemplate.blockAllLinks();

		appStoreTemplate.handleIpadScreenshots();
		appStoreTemplate.handleScrollHeader();
		appStoreTemplate.handleMoreLinks();
	},

	blockAllLinks: function() {
		var anchors = document.getElementsByTagName("a");

		for (var i = 0; i < anchors.length; i++) {
			if( anchors[i].classList.contains('get-button') ) continue;

   			anchors[i].addEventListener('click', function(e) {
   				e.preventDefault();
   			});
		}
	},	

	handleIpadScreenshots: function() {
		document.getElementById("device-compat").addEventListener("click", function(e) {
			document.body.classList.add("show-ipad");
		});
	},

	handleScrollHeader: function() {
		setInterval( function() {
			if ( window.scrollY > 125 ) {
				document.body.classList.add("show-scroll-header");
			} else {
				document.body.classList.remove("show-scroll-header");
			}
		}, 100 );
	},

	handleMoreLinks: function() {
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
	}
}

document.addEventListener("DOMContentLoaded", appStoreTemplate.domLoaded);
