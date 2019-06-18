<?php
require_once( dirname( __FILE__ ) . '/functions.php' );

$grabber = new Appstore_Grabber( urlencode( $_GET['id'] ) );

ob_start();
require_once( dirname( __FILE__ ) . '/output.php' );
$html = ob_get_contents();
ob_end_clean();

$filepath = '';
$filename = 'app' . rand() . '.zip';

$zip = new ZipArchive;

// Generate and download new ZIP
if ( $zip->open( $filepath . $filename, ZipArchive::CREATE ) === true ) {
	$zip->addFromString('app/index.html', $html);
 
    // Add files to the zip file
    $zip->addFile( dirname( dirname( __FILE__ ) ) . '/style.css', 'app/style.css' );
    $zip->addFile( dirname( dirname( __FILE__ ) ). '/app.js', 'app/app.js' );

    if ( $imageDir = opendir( dirname( dirname( __FILE__ ) ) . '/images' ) ) {
    	while ( false !== ( $imageFileName = readdir( $imageDir ) ) ) {
    		if ( $imageFileName != "." && $imageFileName != ".." && strpos( $imageFileName, '.png' ) !== false ) {
    			$zip->addFile( dirname( dirname( __FILE__ ) ) . '/images/' . $imageFileName, 'app/images/' . $imageFileName );
            }
        }

        closedir( $imageDir );
    }

    $zip->close();

	if ( file_exists( $filepath . $filename ) ) {
		header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		header("Cache-Control: public");
		header("Content-Description: File Transfer");
		header("Content-type: application/octet-stream");
		header("Content-Disposition: attachment; filename=app.zip" );
		header("Content-Transfer-Encoding: binary");
		header("Content-Length: " . filesize( $filepath . $filename ) );
		
		readfile( $filepath . $filename );
	}

	// // Delete all existing zip files
	if ( $dir = opendir( '.' ) ) {
		while ( false !== ( $zipFile = readdir( $dir ) ) ) {
			if ( strpos( $zipFile, '.zip' ) !== false ) {
				echo $zipFile;
				unlink( realpath( $zipFile ) );
			}
		}
	}

} else {
	die( "Sorry, there was an error creating the download package." );
}