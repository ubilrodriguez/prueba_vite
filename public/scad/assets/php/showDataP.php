<?php
	$name=$_POST['data'];
	//$name="admin";
	$filename = '../data/users.json';
	$data = file_get_contents($filename);
	$users = json_decode($data,true);
	
	
	$filename2 = '../json/scad_datosPersonales.json';
	$data2 = file_get_contents($filename2);
	$data_json2 = json_decode($data2,true);
	echo "oli";
				//echo json_encode($data_json2["elements"][0]["elements"][0]["elements"][2]["elements"][1]["property"]);
	foreach ($users["users"] as $key=>$mat) {
		if($mat["user"]==$name ) /*para scad*/
		//if($mat->user==$name ) /*para host*/
			{
				//echo json_encode($mat);
				$data_json2["elements"][0]["elements"][0]["elements"][2]["elements"][0]["property"]["value"]=$mat["name"];
				
				$data_json2["elements"][0]["elements"][0]["elements"][2]["elements"][1]["property"]["value"]=$mat["surname"];
				
				$data_json2["elements"][0]["elements"][0]["elements"][2]["elements"][2]["property"]["value"]=$mat["surname2"];
				
				$data_json2["elements"][0]["elements"][0]["elements"][2]["elements"][3]["property"]["value"]=$mat["dreccion"];
				
				$data_json2["elements"][0]["elements"][0]["elements"][2]["elements"][4]["property"]["value"]=$mat["ciudad"];
				
				$data_json2["elements"][0]["elements"][0]["elements"][2]["elements"][5]["property"]["value"]=$mat["fechaNac"];
				
				
				$data_json2["elements"][0]["elements"][0]["elements"][2]["elements"][6]["property"]["value"]="prueba7";/*ver el control del date*/
				
				$data_json2["elements"][0]["elements"][0]["elements"][2]["elements"][7]["property"]["value"]=$mat["gmail"];
				
				
				
				$newdata = json_encode($data_json2);
				echo $newdata;
				file_put_contents($filename2, $newdata);
				
				return;
			}
	}
	
	
?>