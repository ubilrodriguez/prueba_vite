<?php
	$name=$_POST['data'];
	$filename = '../json/mantenimiento.json';
	$data = file_get_contents($filename);
	$users = json_decode($data,true);
	//echo $data;
	//echo $users;
	//echo json_encode($users)
	//echo json_encode($users["elements"][0]["elements"][0]["elements"][0]["elements"][0]["property"]["value"]);
	
	
	$users["elements"][0]["elements"][0]["elements"][0]["elements"][0]["property"]["value"]=$name;
	
	$newdata = json_encode($users);
	//echo  $newdata;
	
	file_put_contents($filename, $newdata);
	
	/*$file_handle = fopen($filename, 'r');
	echo fread($file_handle, filesize($filename));
	//fwrite($file_handle,json_encode($users));*/
?>