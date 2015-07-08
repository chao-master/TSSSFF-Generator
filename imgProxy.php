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

        $width = $img->getImageWidth();
        $height = $img->getImageHeight();

        $wScale = 601./$width;
        $hScale = 444./$height;

        if($wScale > $hScale){
            $img->resizeImage(floor($width*$hScale), 444, 1, 0);
        } else {
            $img->resizeImage(601, floor($height*$wScale), 1, 0);
        }

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
