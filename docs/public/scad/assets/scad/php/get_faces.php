<?php 

$path = "../../data/faces.json";
if (file_exists($path))
{
$len_file=filesize ($path);
$file = fopen($path, "r");
echo fread($file,$len_file);
fclose($file);
}
echo "";

?>