<?php
$remoteImage = $_GET["img"];

$allowedSites = ["https://derpicdn.net"];

foreach ($allowedSites as $site) {
    //Check if it's on the allowed site's list
    if (substr($remoteImage, 0, strlen($site)) === $site){
        $imginfo = getimagesize($remoteImage);
        header("Content-type: ".$imginfo['mime']);
        readfile($remoteImage);
        die();
    }
}
//If not try a redirect to see if they have CROS
print $remoteImage;
http_redirect($remoteImage);
?>
