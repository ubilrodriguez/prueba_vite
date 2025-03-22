<?php 
             
 /* $path = "../json/menu.json";

		$file = fopen($path, "r");
		$data =fgets($file);
		fclose($file);
		echo $data;  */
		  
		  
echo '{ 
	"name": "panatalla1", 
	"id": "panatalla1", 
	
	"elements":
		[   
				
				{"type":"elementM","class":"styleMenu","style":{"color": "transparent"},"property":{"image":"./assets/img/home.png","text":"Inicio","sizex":"100%","sizey":"auto"},
				"elements":
						[
						     
							{"type":"submenu",
							"elements":
								[
									 
									{"type":"items","property":{"text":"Principal","icon":"true"},
									 "elements":
										[
											 
											{"type":"submenu",
											"elements":
												[
													 
													{"type":"items","property":{"text":"Principal"}},
													{"type":"items","property":{"text":"Grafica"}},
													{"type":"items","property":{"text":"Configuración"}},
													{"type":"items","property":{"text":"Administración"}}
													
													
												]
											
											}
											
											
										]
									},
									{"type":"items","property":{"text":"Grafica","icon":"true"},
									 "elements":
										[
											 
											{"type":"submenu",
											"elements":
												[
													 
													{"type":"items","property":{"text":"Principal"}},
													{"type":"items","property":{"text":"Grafica"}}
													
													
													
												]
											
											}
											
											
										]},
									{"type":"items","property":{"text":"Configuración"}},
									{"type":"items","property":{"text":"Administración"}}
									
									
								]
							
							}
							
							
						]	},
				{"type":"elementM","class":"styleMenu","style":{"color": "transparent"},"property":{"image":"./assets/img/ajustes.png","text":"Ajustes","sizex":"100%","sizey":"auto","posx":"0%","posy":"10px"},
				"elements":
						[
						     
							{"type":"submenu",
							"elements":
								[
									 
									{"type":"items","property":{"text":"Principal","icon":"true"},
									 "elements":
										[
											 
											{"type":"submenu",
											"elements":
												[
													 
													{"type":"items","property":{"text":"Principal"}},
													{"type":"items","property":{"text":"Grafica"}},
													{"type":"items","property":{"text":"Configuración"}},
													{"type":"items","property":{"text":"Administración"}}
													
													
												]
											
											}
											
											
										]
									},
									{"type":"items","property":{"text":"Grafica","icon":"true"},
									 "elements":
										[
											 
											{"type":"submenu",
											"elements":
												[
													 
													{"type":"items","property":{"text":"Principal"}},
													{"type":"items","property":{"text":"Grafica"}}
													
													
													
												]
											
											}
											
											
										]},
									{"type":"items","property":{"text":"Configuración"}},
									{"type":"items","property":{"text":"Administración"}}
									
									
								]
							
							}
							
							
						]}
				
			
		]	
			
		
		
		
}' ;
	

?>