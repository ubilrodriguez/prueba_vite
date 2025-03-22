<?php 	
	$name=$_POST['name'];
	$data=$_POST['data'];
	
	//$json=file_get_contents("php://input");
	//$data=json_decode($json,true);
	//echo $data;
	
	//echo "IIIII";
	
	//echo $name;
	
	$ruta = "/assets/foto/".$name.".jpeg";	
	echo $ruta;
	$base_to_php = explode(',', $data);

	$datap = base64_decode($base_to_php[1]);
	
	file_put_contents($ruta, $datap);
	
	echo 'saved';
	
?>