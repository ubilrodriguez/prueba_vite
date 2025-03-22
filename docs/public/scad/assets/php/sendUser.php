<?php
	
	$json=file_get_contents("php://input");
	$da=json_decode($json,true);
	
	$miarchivo=fopen('../data/validateUser.json','w');//abrir archivo, nombre archivo, modo apertura
	fwrite($miarchivo, // escribir
     '{"user":"'.$da["user"].'"}');

	fclose($miarchivo); //cerrar archivo
	
	



?>