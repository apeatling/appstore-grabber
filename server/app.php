<?php
require_once('functions.php');

$app_id = $_GET['id'];

$ch = curl_init("https://itunes.apple.com/lookup?country=US&id=" . $app_id);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
$response = json_decode( curl_exec($ch) );

if ( $response->resultCount == 0 ) {
	die( "No Results");
}

$app = $response->results[0];

// Scrape missing or inaccurate data
$scraper = new Appstore_Scraper($app_id);
$app->tagline = $scraper->get_tagline();
$app->rating = $scraper->get_rating();
$app->ratings_count = $scraper->get_ratings_count();
$app->ratings_bar_sizes = $scraper->get_ratings_bar_widths();

// header("Content-type: application/json; charset=utf-8"); 
// echo json_encode($app);  
// die;
?>

<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="style.css?<?php echo rand() ?>">
        <script src="app.js?<?php echo rand() ?>"></script>

        <title></title>
    </head>
    <body>
        <section id="header">
            <ul>
                <li class="icon">
                    <img src="<?php echo $app->artworkUrl512 ?>" alt="App Icon" width="118" height="118">
                </li>
                <li class="app-detail">
                    <h1><?php echo $app->trackCensoredName ?></h1>
                    <p class="promo-line"><?php echo ( empty( $app->tagline ) ) ? $app->artistName : $app->tagline ?></p>
                    
                    <ul class="action-buttons">
                        <li class="get-button"><button>GET</button></li>
                        <li class="share-button"><button></button></li>
                    </p>
                </li>
            </ul>
        </section>

        <section id="ratings-overview">
            <ul class="ratings">
                <li>
                    <h2><?php echo number_format($app->rating, 1) ?></h2>

                    <div class="stars">
                    	<div class="rating-back" style="width: <?php echo ( floatval($app->rating) * 20 ) ?>%"></div>
                        <img src="images/stars.png" height="17" />
                    </div>
                </li>
                <li><?php echo $app->ratings_count ?> Ratings</li>
            </ul>

            <ul class="age">
                <li><h2><?php echo $app->contentAdvisoryRating ?></h2></li>
                <li>Age</li>
            </ul>
        </section>

        <section id="whats-new">
            <ul>
                <li><h2>What's New</h2></li>
                <li>Version <?php echo $app->version ?></li>
            </ul>

            <ul class="versioning">
                <li><a href="">Version History</a></li>
                <li>5d ago</li>
            </ul>

            <div class="desc">
                <p><?php echo str_replace( "\n", '<br>', $app->releaseNotes ) ?></p>
                <a href="" class="more">more</a>
            </div>
        </section>

        <section id="preview">
            <h2>Preview</h2>

            <ul>
                <?php foreach( (array)$app->screenshotUrls as $screenshotUrl ) { ?>
                <li><img src="<?php echo $screenshotUrl ?>" alt="screenshot" height="390"></li>
                <?php } ?>
            </ul>

            <?php if ( !empty($app->ipadScreenshotUrls ) ) { ?>
            <div class="ipad-preview">
                <p class="device-name">
                    <img src="images/iphone-icon.png" alt="device-iphone" width="10" height="16"> 
                    iPhone
                </p>

                <ul>
                    <?php foreach( (array)$app->ipadScreenshotUrls as $screenshotUrl ) { ?>
                    <li><img src="<?php echo $screenshotUrl ?>" alt="screenshot" height="390"></li>
                    <?php } ?>
                </ul> 
                <?php } ?> 
            </div>   
        </section>

        <section id="device-compat"<?php if ( !empty($app->ipadScreenshotUrls ) ) { ?> class="has-ipad"<?php } ?>>
            <ul>
                <?php if ( !empty($app->ipadScreenshotUrls ) ) { ?>
                    <li><img src="images/iphone-icon.png" alt="device-iphone" width="10" height="16"></li>
                    <li>Offers iPad App</li>
                <?php } else { ?>
                    <li><img src="images/iphone-icon.png" alt="device-iphone" width="10" height="16"></li>
                    <li>iPhone</li>
                <?php } ?>
            </ul>
        </section>

        <section id="description">
            <p><?php echo str_replace( "\n", '<br>', $app->description ) ?></p>

            <a href="" class="more">more</a>
        </section>

        <section id="developer">
            <ul>
                <li><a href=""><?php echo $app->artistName ?></a></li>
                <li>Developer</li>  
            </ul>
        </section>

        <section id="ratings-reviews">
            <ul class="heading">
                <li><h2>Ratings &amp; Reviews</h2></li>
                <li><a href="">See All</a></li>
            </ul>

            <div class="ratings">
                <ul class="rating">
                    <li><?php echo number_format($app->rating, 1) ?></li>
                    <li>out of 5</li>
                </ul>

                <ul class="rating-totals">
                    <li>
                        <ul>
                            <li class="stars">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                            </li>
                            <li class="total five-stars">
                                <div>
                                    <div class="barfront" style="width: <?php echo $app->ratings_bar_sizes[0] ?>;"></div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li class="stars">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                            </li>
                            <li class="total four-stars">
                                <div class="barback">
                                    <div class="barfront" style="width: <?php echo $app->ratings_bar_sizes[1] ?>;"></div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li class="stars">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                            </li>
                            <li class="total three-stars">
                                <div class="barback">
                                    <div class="barfront" style="width: <?php echo $app->ratings_bar_sizes[2] ?>;"></div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li class="stars">
                                <img src="images/stars/full.png" width="6" height="6">
                                <img src="images/stars/full.png" width="6" height="6">
                            </li>
                            <li class="total two-stars">
                                <div class="barback">
                                    <div class="barfront" style="width: <?php echo $app->ratings_bar_sizes[3] ?>;"></div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li class="stars">
                                <img src="images/stars/full.png" width="6" height="6">
                            </li>
                            <li class="total one-star">
                                <div class="barback">
                                    <div class="barfront" style="width: <?php echo $app->ratings_bar_sizes[4] ?>;"></div>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li><?php echo $app->ratings_count ?> Ratings</li>
                </ul>
            </div>
        </section>

        <section id="leave-rating">
            <ul class="tap-rate">
                <li>Tap to Rate:</li>
                <li>
                    <img src="images/stars/rate-star.png" width="24" height="23">
                    <img src="images/stars/rate-star.png" width="24" height="23">
                    <img src="images/stars/rate-star.png" width="24" height="23">
                    <img src="images/stars/rate-star.png" width="24" height="23">
                    <img src="images/stars/rate-star.png" width="24" height="23">
                </li>
            </ul>

            <ul class="links">
                <li><a href="">Write a Review</a></li>
                <li><a href="">App Support</a></li>
            </ul>
        </section>

        <section id="information">
            <h2>Information</h2>

            <ul>
                <li>
                    <h3>Seller</h3>
                    <p><?php echo $app->artistName ?></p>
                </li>
                <li>
                    <h3>Size</h3>
                    <p><?php echo formatBytes($app->fileSizeBytes, 1) ?></p>
                </li>
                <li>
                    <h3>Category</h3>
                    <p><?php echo $app->primaryGenreName ?></p>
                </li>
                <li>
                    <h3>Compatibility</h3>
                    <p>Works on this iPhone</p>
                </li>
                <li>
                    <h3>Languages</h3>
                    <p>English<?php if ( count($app->languageCodesISO2A) > 1 ) { ?> and <?php echo count($app->languageCodesISO2A) - 1 ?> more<?php } ?></p>
                </li>
                <li>
                    <h3>Age Rating</h3>
                    <p><?php echo $app->contentAdvisoryRating ?></p>
                </li>
                <li>
                    <h3>Copyright</h3>
                    <p>&copy; <?php echo $app->artistName ?></p>
                </li>
                <li>
                    <h3><a href="<?php echo $app->sellerUrl ?>">Developer Website</a></h3>
                    <p><a href="<?php echo $app->sellerUrl ?>"><img src="/images/website.png" height="15" alt="Website"></a></p>
                </li>
                <li>
                    <h3><a href="<?php echo $app->sellerUrl ?>">Privacy Policy</a></h3>
                    <p><a href="<?php echo $app->sellerUrl ?>"><img src="/images/privacy.png" height="15" alt="Privacy"></a></p>
                </li>
                <li>
                    <h3><a href="<?php echo $app->sellerUrl ?>">License Agreement</a></h3>
                    <p><a href="<?php echo $app->sellerUrl ?>"><img src="/images/license.png" height="15" alt="License"></a></p>
                </li>
            </ul>
        </section>

        <section id="scroll-header">
            <img src="<?php echo $app->artworkUrl100 ?>" alt="App Icon" width="28" height="28">
            <button>GET</button>
        </section>

        <footer></footer>
    </body>
</html>

