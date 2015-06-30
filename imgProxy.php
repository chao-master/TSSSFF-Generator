<?php
$remoteImage = $_GET["img"];

$allowedSites = [
    "https://derpicdn.net" => function($url){
        if (!preg_match("~https://derpicdn.net/img/view/([0-9]+)/([0-9]+)/([0-9]+)/([0-9]+)[^.]*(\..*)*~",$url,$matches)){
            return $url;
        } else {
            return "https://derpicdn.net/img/$matches[1]/$matches[2]/$matches[3]/$matches[4]/medium$matches[5]";
        }
    }
];

foreach ($allowedSites as $site => $mapping) {
    //Check if it's on the allowed site's list
    if (substr($remoteImage, 0, strlen($site)) === $site){
        if ($mapping){
            $remoteImage = $mapping($remoteImage);
        }
        $imginfo = getimagesize($remoteImage);
        header("Content-type: ".$imginfo['mime']);
        readfile($remoteImage);
        die();
    }
}
//If not try a redirect to see if they have CROS
//print $remoteImage;
//http_redirect($remoteImage);
header("Location: $remoteImage")
?>
