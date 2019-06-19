<?php

if ( isset( $_GET['preview'] ) && !isset( $_GET['dl'] ) ) {
	require_once( dirname( __FILE__ ) . '/inc/preview.php' );
	die;
}

if ( isset( $_GET['dl'] ) && !isset( $_GET['preview'] ) ) {
	require_once( dirname( __FILE__ ) . '/inc/download.php' );
	die;
}

die;