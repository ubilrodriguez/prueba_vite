<?php
	
	//$json=file_get_contents("php://input");
	//$da=json_decode($json,true);
	
	$miarchivo=fopen('/assets/data/coordenadas.json','w');//abrir archivo, nombre archivo, modo apertura
	
	
	$Latitudes = (float) (((rand(1,10000)/10000))+10)*(-1);
	$Longitud = (float)(((rand(1,10000)/10000))+76)*(-1);
	
	$Latitudes1 = (float) (((rand(1,10000)/10000))+10)*(-1);
	$Longitud1 = (float)(((rand(1,10000)/10000))+76)*(-1);
	
	$Latitudes2 = (float) (((rand(1,10000)/10000))+10)*(-1);
	$Longitud2 = (float)(((rand(1,10000)/10000))+76)*(-1);
	
	$Latitudes3 = (float) (((rand(1,10000)/10000))+10)*(-1);
	$Longitud3 = (float)(((rand(1,10000)/10000))+76)*(-1);

	
	fwrite($miarchivo, // escribir
     '[{"lat":"'.$Latitudes.'","lon":"'.$Longitud.'"},{"lat":"'.$Latitudes1.'","lon":"'.$Longitud1.'"},{"lat":"'.$Latitudes2.'","lon":"'.$Longitud2.'"},{"lat":"'.$Latitudes3.'","lon":"'.$Longitud3.'"}]');
	
	fclose($miarchivo); //cerrar archivo
	
	
	
	
	$path = "/assets/data/coordenadas.json";
	if (file_exists($path))
	{
		$len_file=filesize (  $path );
		$file = fopen($path, "r");
		echo fread($file,$len_file);
		fclose($file);
}
echo "";
	
	
	
	
	
	/*[{"lat":"-12.179","lon":"-76.98","id_term":"ter1","panell":"assets/json/scad_initial.json"},
 {"lat":"-12.173","lon":"-76.96","id_term":"ter1","fecha_hora":"7 May , 2021   9 :24:25 "},
 {"lat":"-12.175","lon":"-76.97","id_term":"ter1","fecha_hora":"7 May , 2021   9 :24:25 "},
 {"lat":"-12.170","lon":"-76.99","id_term":"ter1","fecha_hora":"7 May , 2021   9 :24:25 "}]


*/
?>