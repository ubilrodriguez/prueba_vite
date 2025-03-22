<?php 

$text = $_POST['data']; 

$path = "/assets/data/users.json";

$file = fopen($path, "w+");
fwrite($file,$text);
fclose($file);

?>