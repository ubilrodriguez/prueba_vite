<?php 

$text = $_POST['data']; 

$path = "/assets/data/faces.json";

$file = fopen($path, "w+");
fwrite($file,$text);
fclose($file);

?>