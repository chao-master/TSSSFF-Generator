<?php
$remoteImage = $_GET["img"];

$allowedSites = [
    "https://derpicdn.net",
    "http://derpicdn.net"
];

foreach ($allowedSites as $site) {
    //Check if it's on the allowed site's list
    if (substr($remoteImage, 0, strlen($site)) === $site){

        $handle = fopen($remoteImage, 'rb');
        $img = new Imagick();
        $img->readImageFile($handle);
        $img->resizeImage(601, 444, 0, 0);

        $imginfo = getimagesize($remoteImage);
        header("Content-type: ".$imginfo['mime']);
        echo $img->getImageBlob();
        die();
    }
}
//If not try a redirect to see if they have CROS
//print $remoteImage;
//http_redirect($remoteImage);
header("Location: $remoteImage")
?>
