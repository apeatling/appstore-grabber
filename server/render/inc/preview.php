<?php
require_once( dirname( __FILE__ ) . '/functions.php' );

$grabber = new Appstore_Grabber( urlencode( $_GET['id'] ) );

require_once( dirname( __FILE__ ) . '/output.php' );
?>