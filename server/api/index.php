<?php

$term = urlencode( $_GET['term'] );

// Handle app store API requests, keep it super simple.
$request = curl_init( "https://itunes.apple.com/search?media=software&country=US&term=" . $term );

curl_setopt( $request, CURLOPT_RETURNTRANSFER, TRUE );
curl_setopt( $request, CURLOPT_FOLLOWLOCATION, TRUE );
curl_setopt( $request, CURLOPT_AUTOREFERER, TRUE );

$data = curl_exec( $request );

if ( curl_error( $request ) ) {
	die( "{}" );
}

header( 'Content-Type: application/json' );
die( $data );