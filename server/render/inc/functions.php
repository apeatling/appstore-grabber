<?php

class Appstore_Grabber {
    public $app;

    private $app_id;
	private $xpath;

	function __construct( $app_id ) {
        $this->app_id = $app_id;
        
        $this->getApp();
		$this->getDOM();
        $this->getMissingData();
	}

    private function getApp() {
        $ch = curl_init( "https://itunes.apple.com/lookup?country=US&id=" . $this->app_id );
        
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
        curl_setopt( $ch, CURLOPT_AUTOREFERER, true );
        
        $response = json_decode( curl_exec($ch) );

        if ( curl_error( $ch ) || $response->resultCount == 0 || empty( $response->results ) ) {
            $this->app = false;
            return;
        }

        $this->app = $response->results[0];

        curl_close( $ch );
    }

	private function getDOM() {
		$ch = curl_init("https://itunes.apple.com/us/app/id" . $this->app_id . "?mt=8");
	    
	    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
	    curl_setopt( $ch, CURLOPT_AUTOREFERER, true );
	    
	    $result = curl_exec( $ch );

	    if ( curl_error( $ch ) ) {
	        $this->xpath = false;
            return;
	    }
	    
    	$dom = new DOMDocument();
    	$dom->loadHTML( $result );
    	libxml_clear_errors();

    	$this->xpath = new DOMXPath( $dom );

    	curl_close( $ch );
    }

    private function getMissingData() {
        $this->app->tagline = $this->getTagline();
        $this->app->rating = $this->getRating();
        $this->app->ratings_count = $this->getRatingsCount();
        $this->app->ratings_bar_sizes = $this->getRatingsBarWidths();
    }

    private function getTagline() {
    	$elements = $this->xpath->query( '//h2[contains(@class,"app-header__subtitle")]' );

    	if ( empty( $elements->item(0)->nodeValue ) ) {
    		return false;
    	}

    	return $elements->item(0)->nodeValue;
    }

    private function getRating() {
    	$elements = $this->xpath->query( '//figcaption[contains(@class,"star-rating__count")]' );
    	$rating = explode( ",", $elements->item(0)->nodeValue )[0];

    	if ( empty($rating) ) {
    		return false;
    	}

    	return $rating;
    }

    private function getRatingsCount() {
		$elements = $this->xpath->query( '//figcaption[contains(@class,"star-rating__count")]' );
    	$ratings_count = explode( " ", explode( ",", $elements->item(0)->nodeValue)[1] )[1];

    	if ( empty( $ratings_count) ) {
    		return false;
    	}

    	return $ratings_count;
    }

    private function getRatingsBarWidths() {
    	$elements = $this->xpath->query( '//div[contains(@class,"we-star-bar-graph__bar__foreground-bar")]');
    	
    	$widths = [];
    	foreach( $elements as $bar ) {
			$style_attr_val = $bar->attributes->item(1)->value;
			$widths[] = substr( explode( " ", $bar->attributes->item(1)->value )[1], 0, -1);
    	}
		
		return $widths;
    }
}

function formatBytes( $bytes, $precision = 2 ) { 
    $units = array( 'B', 'KB', 'MB', 'GB', 'TB' ); 

    $bytes = max( $bytes, 0 ); 
    $pow = floor( ( $bytes ? log( $bytes ) : 0 ) / log( 1024 ) ); 
    $pow = min( $pow, count( $units ) - 1); 
    $bytes /= pow( 1024, $pow );
    
    return round( $bytes, $precision ) . ' ' . $units[$pow]; 
} 

?>