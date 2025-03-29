<?php	
	
	
	$json=file_get_contents("php://input");
	$da=json_decode($json,true);
		 
	$filename = '/assets/data/users.json';/*para scad*/
	//$filename = '../data/users.json';/*para host*/
	$data = file_get_contents($filename);
	$user0s = json_decode($data);	
	
	foreach ($user0s as $mat) 
	{
		foreach ($mat as $user) 
		{
			if($user["user"]==$da["user"] &&  $user["pass"]==$da["password"]) /*para scad*/
			//if($user->user==$da["user"] &&  $user->pass==$da["password"]) /*para host*/
			{
					echo "1" ;
					return;
			}
		}
	}	
	
	

?>