
<?php	
	
	//obtener la nueva contraseña*/
	
	$newpass=$_POST['newpass'];
	$passA=$_POST['pass'];
	
	//echo "saved";
	//echo $passA;
	//echo $newpass;
	
	//obtengo el usuario
	$filename = '../data/validateUser.json';
	$json_string=file_get_contents($filename);
	$usuario = json_decode($json_string,true);
	

	
	//obtengo todos los usuarios
	
	//$filename2 = '/assets/data/users.json';/*para scad*/
	$filename2 = '../data/users.json';/*para host*/
	$json_string2 = file_get_contents($filename2);
	$users = json_decode($json_string2,true);
	
	foreach ($users as $mat) 
	{
		foreach ($mat as $key=>$user) 
		{	
	
			
			/*if($user["user"]==$da["user"] &&  $user["pass"]==$da["password"]) /*para scad*/
			if($user["user"]==$usuario["user"] && $user["pass"]==$passA) 
			{	
				
				//echo $user["pass"];
				//echo json_encode($users);
				//echo json_encode($users["users"][$key]);
				//echo json_encode($users["users"][$mat]);
				$users["users"][$key]["pass"]=$newpass;
				//echo $user["pass"];
				
				echo $newdata = json_encode($users);
				//echo  $newdata;
	
				file_put_contents($filename2, $newdata);
				return;
			}
				
		}
	}	
	
	

?>