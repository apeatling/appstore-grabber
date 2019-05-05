<?php

class Appstore_Scraper {
	private $app_id;
	private $xpath;

	function __construct($app_id) {
		$this->app_id = $app_id;
		$this->getDOM();
	}

	private function getDOM() {
		$ch = curl_init("https://itunes.apple.com/us/app/id" . $this->app_id . "?mt=8");
	    
	    $headers = array();
	    $headers[] = "Referer: https://google.com/";
	    $headers[] = "Origin: https://google.com/";
	    $headers[] = "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36";
	    
	    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
	    curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
	    
	    $result = curl_exec($ch);

	    if (curl_error($ch)) {
	        return false;
	    }
	    
    	$dom = new DOMDocument();
    	$dom->loadHTML($result);
    	libxml_clear_errors();

    	$this->xpath = new DOMXPath($dom);

    	curl_close($ch);
    }

    public function get_tagline() {
    	$elements = $this->xpath->query('//h2[contains(@class,"app-header__subtitle")]');

    	if ( empty($elements->item(0)->nodeValue) ) {
    		return false;
    	}

    	return $elements->item(0)->nodeValue;
    }

    public function get_rating() {
    	$elements = $this->xpath->query('//figcaption[contains(@class,"star-rating__count")]');
    	$rating = explode(",", $elements->item(0)->nodeValue)[0];

    	if ( empty($rating) ) {
    		return false;
    	}

    	return $rating;
    }

    public function get_ratings_count() {
		$elements = $this->xpath->query('//figcaption[contains(@class,"star-rating__count")]');
    	$ratings_count = explode(" ", explode(",", $elements->item(0)->nodeValue)[1] )[1];

    	if ( empty($ratings_count) ) {
    		return false;
    	}

    	return $ratings_count;
    }
}

function formatBytes($bytes, $precision = 2) { 
    $units = array('B', 'KB', 'MB', 'GB', 'TB'); 

    $bytes = max($bytes, 0); 
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024)); 
    $pow = min($pow, count($units) - 1); 

    // Uncomment one of the following alternatives
    $bytes /= pow(1024, $pow);
    // $bytes /= (1 << (10 * $pow)); 

    return round($bytes, $precision) . ' ' . $units[$pow]; 
} 

?>