<?php

$app_id = $_GET['id'];

$ch = curl_init("https://itunes.apple.com/lookup?country=US&id=" . $app_id);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
$response = json_decode( curl_exec($ch) );

if ( $response->resultCount == 0 ) {
	die( "No Results");
}

$app = $response->results;

echo "<pre>";
var_dump( $app[0] );

?>