import { siarp_initDrawVRM, siarp_camPowerOff, siarp_camPowerOn, siarp_getDataVRM ,siarp_getDataVRM2, siarp_initDrawVRM_pop,siarp_moveVRM,siarp_setMovCoor,siarp_setRotationPart,animacion_desvanecer/*data avatar*/ } from '../../../script.js';

function createRegister()
{
	var cameraOpen=false;
	var contButtonCamOff,contButtonsCamOn,contConfCam;
	var listaShot=[];
	createPageRegister();
	var util=new scad_util();
	
	///////////////// FUNCIONAMIENTO DE LA PAGINA ///////////////////	
	function createPageRegister()
	{
		///////////////// CREACION DE LA PAGINA ///////////////////
		var contGrnl=new scad_ctrlPanel(document.body,"id","class");
		
		contGrnl.addPosition("absolute");
		contGrnl.sizePanel("100%","100%");
		contGrnl.addImagePanel("scad/assets/img/scad_demoRegister/fondo.jpg","1");
		
		var contConfElem=new scad_ctrlPanel(contGrnl.getHandler(),"id","scad_confPanelPrinPasw");
		var contGnrlBtnHome=new scad_ctrlPanel(contConfElem.getHandler(),"id","contDivBtnHome");
		var contBtnHome=new scad_ctrlPanel(contGnrlBtnHome.getHandler(),null,"contBtnHome");
		contBtnHome.sizePanel("70px","calc(100% - 1px)");
		var btnImgHome=new scad_ctrlBoton(contBtnHome.getHandler(),"btnHome","btnHome");
		btnImgHome.typeBut("button");
		btnImgHome.addImageButton("scad/assets/img/scad_demoRegister/home.png");
		btnImgHome.addTooltip("Home");
		btnImgHome.getHandler().onclick=function(){window.open('index.html', '_self')};
		var contConfElem2=new scad_ctrlPanel(contConfElem.getHandler(),"id","scad_confPaswContElem");
		var contConfTitle=new scad_ctrlPanel(contConfElem2.getHandler(),"id","scad_confPaswTitle");
		contConfTitle.addTextPanel("Registro de acciones");
			
		
		var contConfForm=new scad_ctrlPanel(contConfElem2.getHandler(),"id","scad_confPassCForm");
		
		
		var contConfTools=new scad_ctrlPanel(contConfElem2.getHandler(),"","scad_conTools");
		contConfCam=new scad_ctrlPanel(contConfElem2.getHandler(),"scad_conCam","scad_conCam");
		contConfCam.hiddenPanel();
		var contConfFace=new scad_ctrlPanel(contConfElem2.getHandler(),"scad_conCam2","scad_conCam");
		contConfFace.addImagePanel("scad/assets/img/scad_demoRegister/face.png");
		//contConfFace.sizePanel("100%","100%");
		
		var contShot=new scad_ctrlPanel(contConfElem2.getHandler(),"","scad_conShot");
		
		

		var contLiShotTitl=new scad_ctrlPanel(contShot.getHandler(),"","scad_conList_ti");
		contLiShotTitl.addTextPanel("Shot: ");
		/*contenedor de shot*/
		var contLiShot=new scad_ctrlPanel(contShot.getHandler(),"listShot","scad_conList");
		
		
		
		scad_util_insertobj(contConfCam.getHandler(),"video","id","video01","class","input_video","style",'width:'+98+'%;height:'+34+'%;position:absolute');
		scad_util_insertobj(contConfCam.getHandler(),"canvas","id","canvas02","class","guides","style",'width:'+98+'%;height:'+34+'%;z-index: 999999;position:absolute');
	
		
		
		var contTextBoxUser=new scad_ctrlTextBox(contConfForm.getHandler(),"nameAccion","scad_confPaswTxtB","","","text","","","Ingrese la Acción");
		
		//var contTextBoxPass=new scad_ctrlTextBox(contConfForm.getHandler(),"changepass","scad_confPaswTxtB","","","text","","","Ingrese la Descripcion");
		
		var contTextBoxDescrip=new scad_ctrlTextBox(contConfForm.getHandler(),"description","scad_confPaswTxtB","","","text","","","Ingrese breve descripción");
		
		var contTextBoxVoice=new scad_ctrlTextBox(contConfForm.getHandler(),"voice","scad_confPaswTxtB","","","text","","","Ingrese la respuesta del avatar");
		
		
		var contButtonRegister=new scad_ctrlBoton(contConfElem2.getHandler(),"btnRegister","scad_btnRegister");
		contButtonRegister.typeBut("button");
		contButtonRegister.addTextButton("Registrar");
		//contButtonRegister.disabled();
		
		contButtonRegister.getHandler().onclick=function()
		{
			let newArr=[];
			//console.log(JSON.stringify(listaShot));
			//let newL=listaShot[0].slice();
			let newL=[];
						
				for(let j=0;j<listaShot[0].length;j++)
				{
					newL[j]=[];
					newL[j][0]=listaShot[0][j][0];
					newL[j][1]=[];
					for(let i=0;i<listaShot.length;i++)
					{	
						var str_val=listaShot[i][j][1][0];
						if(",,"==str_val)str_val="";
						newL[j][1].push(str_val);					
					}
				}
				for(let j=0;j<newL.length;j++)
				{
					//console.log(newL[j][1]);
					newL[j][1]=JSON.stringify(newL[j][1]);
				}
			//let newL=listaShot.slice();;
			/*for(let k=0;k<newL.length;k++)
			{				
				newL[k][1]=[];
			}
			console.log(newL);
			newArr=newL;
			console.log(newArr);
			for(let i=0;i<listaShot.length;i++)
			{
						
				for(let j=0;j<listaShot[i].length;j++)
				{
					if(listaShot[i][j][0]){
						newArr[j][1].push(listaShot[i][j][1]);
					}
				}
			}*/
			//console.log(listaShot);
			//console.log(newL);
			//console.log(JSON.stringify(newL));

			

			var nameAccion=util.scad_util_getObjDOM("nameAccion").value;
			var description=util.scad_util_getObjDOM("description").value;
			var voice=util.scad_util_getObjDOM("voice").value;

			//var coor=siarp_getDataVRM();
			if(nameAccion!="" && description!="")
			{

				var confirm=new scad_ctrlConfirm(document.body,"yes/no",null,functYesRegister);
				confirm.addTxtHead("Confirmación");
				confirm.addTextBody("¿Está seguro de guardar los datos?");

				function functYesRegister()
				{
					var time=scad_util_getTime("time");
					var date=scad_util_getTime("date");
					//var coor='[["id_mano",4,5,4],["id_brazo",4,5,4]]';
					//var coor=siarp_getDataVRM();
					

					var data=['"'+nameAccion+'"','"'+voice+'"','"'+description+'"',JSON.stringify(newL)];
					
					var req='{"opera":"40","date":"'+date+'","time":"'+time+'","data":[['+data+']]}';
					//console.log(req)
					var ptr=new scad_sysData("/siarp_acciones.json","POST",req,sendRegister,null,null,null,null,null);
					ptr.setSync(false);		
					ptr.setReturnType("json");
					ptr.setSendType("json");		
					ptr.send();
					
					function sendRegister(data)
					{
						//console.log(data);
						if(data["rc"]=="0")
						{
							
							var msg=new scad_ctrlConfirm(document.body,"acept",null,functOk);
							msg.addTxtHead("Aviso");
							msg.addTextBody("Los datos se registraron con éxito");

							
						};
					};
				};

				
				
			}else{
				//console.log("nooooooo");
				var msg=new scad_ctrlConfirm(document.body,"acept",null,functOk);
				msg.addTxtHead("¡Advertencia!");
				msg.addTextBody("Los campos de Accion y/o descripcion no deben estar en blanco");
				
				
			};

			function functOk()
			{	
				//console.log("acepte")
				scad_util_getObjDOM("nameAccion").value="";
				scad_util_getObjDOM("description").value="";
				scad_util_getObjDOM("voice").value="";
				while (contLiShot.getHandler().firstChild) {
					contLiShot.getHandler().removeChild(contLiShot.getHandler().firstChild);
				}
				listaShot=[];
			};
		};
		
		
		contButtonCamOff=new scad_ctrlBoton(contConfTools.getHandler(),"actCamOff","scad_confPaswBtn");
		contButtonCamOff.typeBut("button");
		//contButtonPoppusCam.addTextButton("Camara");
		contButtonCamOff.addImageButton("scad/assets/img/scad_demoRegister/camaraOff.png");
		contButtonCamOff.hiddenButton();
		contButtonCamOff.getHandler().onclick=function(){
			//console.log("camara");
			if(siarp_camPowerOff!=null)
			{
				siarp_camPowerOff();
				contButtonsCamOn.showButton();
				contButtonsCamOn.getHandler().style.display="inline-block";
				contButtonCamOff.hiddenButton();
				contConfFace.showPanel();
				
				contConfCam.hiddenPanel();

				contButtonShot.getHandler().disabled=true;
			}
		};		
		
		
		contButtonsCamOn=new scad_ctrlBoton(contConfTools.getHandler(),"actCamOn","scad_confPaswBtn");
		contButtonsCamOn.typeBut("button");
		contButtonsCamOn.getHandler().onclick=function(){
			//console.log("camara");
			if(siarp_camPowerOn!=null)
			{
				siarp_camPowerOn();				
				contButtonCamOff.showButton();
				contButtonCamOff.getHandler().style.display="inline-block";
				contButtonsCamOn.hiddenButton();
				contConfFace.hiddenPanel();
				contConfCam.showPanel();

				/*Listar movimientos*/
				contButtonShot.getHandler().disabled=false;
				contButtonShot.getHandler().onclick=function(){	
					var lenChild = contLiShot.getHandler().childNodes.length;				
					if(lenChild<5)
					{
						let coor=siarp_getDataVRM2();
						//console.log(coor);
						let item= scad_insertobj(contLiShot.getHandler(),"li","class","item_lisSh","id","item_lisSh_"+lenChild);
						
						//console.log(listaShot);
						item.innerHTML=coor[0][1]+coor[1][1]+coor[2][1];
						
						item.ondblclick=async function(){
							contButtonsCamOn.showButton();
							contButtonsCamOn.getHandler().style.display="inline-block";
							contButtonCamOff.hiddenButton();
							contConfFace.showPanel();
							
							contConfCam.hiddenPanel();
			
							contButtonShot.getHandler().disabled=true;
							await siarp_camPowerOff();
							
							var contPop=new scad_ctrlPanel(document.body,"id_contePop","contePop");
							var contPopA=new scad_ctrlPanel(contPop.getHandler(),"id_contePopA","contePopA");
							var contPopH=new scad_ctrlPanel(contPopA.getHandler(),"id_contePopH","contePopH");
							var btn_ext=new scad_ctrlBoton(contPopH.getHandler(),"id_btn_exit","btn_exit");
							btn_ext.typeBut("button");
							btn_ext.addImageButton("scad/assets/img/scad_demoRegister/cerrar_negro.png");
							var contPopB=new scad_ctrlPanel(contPopA.getHandler(),"id_contePopB","contePopB");
							var contTitle=new scad_ctrlPanel(contPopB.getHandler(),"id_title_pop","title_pop");
							contTitle.addTextPanel("EDITAR SHOT");

							var contToolRight=new scad_ctrlPanel(contPopB.getHandler(),"id_conteToolR","conte_Tool");
							var contTRContBtn=new scad_ctrlPanel(contToolRight.getHandler(),"","conte_headBtn");
							contTRContBtn.addTextPanel("Mano derecha");
							/*NEW*/
							await scad_ctrlCheckBox(contTRContBtn,"id_btn_brazoR","btn_cadD","Brazo","radios2");
							await scad_ctrlCheckBox(contTRContBtn,"id_btn_anteBrazoR","btn_cadD","Antebrazo","radios2");
							await scad_ctrlCheckBox(contTRContBtn,"id_btn_munecaR","btn_cadD","Muñeca","radios2");
							/**********/
							await scad_ctrlCheckBox(contTRContBtn,"id_btn_pulgarR","btn_cadD","Pulgar","radios2");
							await scad_ctrlCheckBox(contTRContBtn,"id_btn_indiceR","btn_cadD","Índice","radios2");
							await scad_ctrlCheckBox(contTRContBtn,"id_btn_medioR","btn_cadD","Medio","radios2");
							await scad_ctrlCheckBox(contTRContBtn,"id_btn_anularR","btn_cadD","Anular","radios2");
							await scad_ctrlCheckBox(contTRContBtn,"id_btn_meniqueR","btn_cadD","Meñique","radios2");
							/*NEW*/
							var r_brazoR = document.getElementById("id_btn_brazoR");
							var r_anteBrazoR = document.getElementById("id_btn_anteBrazoR");
							var r_munecaR = document.getElementById("id_btn_munecaR");
							/********/
							var r_pulR = document.getElementById("id_btn_pulgarR");
							var r_indR = document.getElementById("id_btn_indiceR");
							var r_medR = document.getElementById("id_btn_medioR");
							var r_anuR = document.getElementById("id_btn_anularR");
							var r_menR = document.getElementById("id_btn_meniqueR");
							var contTRContFal=new scad_ctrlPanel(contToolRight.getHandler(),"","conte_bodyBtn");
							var contTRCFal1=new scad_ctrlPanel(contTRContFal.getHandler(),"conte_distal_1R","conte_distal");
							contTRCFal1.addTextPanel("Distal");
							let ran_dis1R=scad_ctrlRange(contTRCFal1,"id_rangeDistalxR","range_","X","0");
							let ran_dis2R=scad_ctrlRange(contTRCFal1,"id_rangeDistalyR","range_","Y","0");
							let ran_dis3R=scad_ctrlRange(contTRCFal1,"id_rangeDistalzR","range_","Z","0");

							var contTRCFal2=new scad_ctrlPanel(contTRContFal.getHandler(),"conte_distal_2R","conte_distal");
							contTRCFal2.addTextPanel("Medial");
							let ran_med1R=scad_ctrlRange(contTRCFal2,"id_rangeMedialxR","range_","X","0");
							let ran_med2R=scad_ctrlRange(contTRCFal2,"id_rangeMedialyR","range_","Y","0");
							let ran_med3R=scad_ctrlRange(contTRCFal2,"id_rangeMedialzR","range_","Z","0");

							var contTRCFal3=new scad_ctrlPanel(contTRContFal.getHandler(),"conte_distal_3R","conte_distal");
							contTRCFal3.addTextPanel("Proximal");
							let ran_pro1R=scad_ctrlRange(contTRCFal3,"id_rangeProximalxR","range_","X","0");
							let ran_pro2R=scad_ctrlRange(contTRCFal3,"id_rangeProximalyR","range_","Y","0");
							let ran_pro3R=scad_ctrlRange(contTRCFal3,"id_rangeProximalzR","range_","Z","0");
							/*NEW*/
							r_brazoR.onchange=function(){
								scad_hiddenP(["conte_distal_1R","conte_distal_2R","conte_distal_3R"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===52){
										scad_updateRange([ran_dis1R,ran_dis2R,ran_dis3R],coor[index]);
									}										
								}
								scad_updateFingerPosAvatar([52,0,0],{"distal":[ran_dis1R,ran_dis2R,ran_dis3R],"medial":[ran_med1R,ran_med2R,ran_med3R],"proximal":[ran_pro1R,ran_pro2R,ran_pro3R]});
							};
							r_anteBrazoR.onchange=function(){
								scad_hiddenP(["conte_distal_1R","conte_distal_2R","conte_distal_3R"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===39){
										scad_updateRange([ran_dis1R,ran_dis2R,ran_dis3R],coor[index]);
									}										
								}
								scad_updateFingerPosAvatar([39,0,0],{"distal":[ran_dis1R,ran_dis2R,ran_dis3R],"medial":[ran_med1R,ran_med2R,ran_med3R],"proximal":[ran_pro1R,ran_pro2R,ran_pro3R]});
							};
							r_munecaR.onchange=function(){
								scad_hiddenP(["conte_distal_1R","conte_distal_2R","conte_distal_3R"]);
								
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===32){
										scad_updateRange([ran_dis1R,ran_dis2R,ran_dis3R],coor[index]);
									}										
								}
								scad_updateFingerPosAvatar([32,0,0],{"distal":[ran_dis1R,ran_dis2R,ran_dis3R],"medial":[ran_med1R,ran_med2R,ran_med3R],"proximal":[ran_pro1R,ran_pro2R,ran_pro3R]});
							};
							/******/


							r_pulR.onchange=function(){
								scad_showP(["conte_distal_1R","conte_distal_2R","conte_distal_3R"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===48){
										scad_updateRange([ran_dis1R,ran_dis2R,ran_dis3R],coor[index]);
									}
									if(coor[index][0]===49){
										scad_updateRange([ran_med1R,ran_med2R,ran_med3R],coor[index]);
									}
									if(coor[index][0]===50){
										scad_updateRange([ran_pro1R,ran_pro2R,ran_pro3R],coor[index]);
									}
										
								}
								scad_updateFingerPosAvatar([48,49,50],{"distal":[ran_dis1R,ran_dis2R,ran_dis3R],"medial":[ran_med1R,ran_med2R,ran_med3R],"proximal":[ran_pro1R,ran_pro2R,ran_pro3R]});
							};
							r_indR.onchange=function(){
								scad_showP(["conte_distal_1R","conte_distal_2R","conte_distal_3R"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===33){
										scad_updateRange([ran_dis1R,ran_dis2R,ran_dis3R],coor[index]);
									}
									if(coor[index][0]===34){
										scad_updateRange([ran_med1R,ran_med2R,ran_med3R],coor[index]);	
									}
									if(coor[index][0]===35){
										scad_updateRange([ran_pro1R,ran_pro2R,ran_pro3R],coor[index]);	
									}
										
								}
								scad_updateFingerPosAvatar([33,34,35],{"distal":[ran_dis1R,ran_dis2R,ran_dis3R],"medial":[ran_med1R,ran_med2R,ran_med3R],"proximal":[ran_pro1R,ran_pro2R,ran_pro3R]});
							};
							r_medR.onchange=function(){
								scad_showP(["conte_distal_1R","conte_distal_2R","conte_distal_3R"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===41){
										scad_updateRange([ran_dis1R,ran_dis2R,ran_dis3R],coor[index]);
									}
									if(coor[index][0]===42){
										scad_updateRange([ran_med1R,ran_med2R,ran_med3R],coor[index]);	
									}
									if(coor[index][0]===43){
										scad_updateRange([ran_pro1R,ran_pro2R,ran_pro3R],coor[index]);	
									}
										
								}
								scad_updateFingerPosAvatar([41,42,43],{"distal":[ran_dis1R,ran_dis2R,ran_dis3R],"medial":[ran_med1R,ran_med2R,ran_med3R],"proximal":[ran_pro1R,ran_pro2R,ran_pro3R]});
							};
							r_anuR.onchange=function(){
								scad_showP(["conte_distal_1R","conte_distal_2R","conte_distal_3R"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===44){
										scad_updateRange([ran_dis1R,ran_dis2R,ran_dis3R],coor[index]);
									}
									if(coor[index][0]===45){
										scad_updateRange([ran_med1R,ran_med2R,ran_med3R],coor[index]);	
									}
									if(coor[index][0]===46){
										scad_updateRange([ran_pro1R,ran_pro2R,ran_pro3R],coor[index]);	
									}
										
								}
								scad_updateFingerPosAvatar([44,45,46],{"distal":[ran_dis1R,ran_dis2R,ran_dis3R],"medial":[ran_med1R,ran_med2R,ran_med3R],"proximal":[ran_pro1R,ran_pro2R,ran_pro3R]});
							};
							r_menR.onchange=function(){
								scad_showP(["conte_distal_1R","conte_distal_2R","conte_distal_3R"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===36){
										/*Función que actuliza el valor del rango segun dedo seleccionado*/
										scad_updateRange([ran_dis1R,ran_dis2R,ran_dis3R],coor[index]);	
									}
									if(coor[index][0]===37){
										scad_updateRange([ran_med1R,ran_med2R,ran_med3R],coor[index]);	
									}
									if(coor[index][0]===38){
										scad_updateRange([ran_pro1R,ran_pro2R,ran_pro3R],coor[index]);		
									}	
								}
								//json_ = {"distal":[],"medial":[],"proximal":[]}; //tiene que estar ordenado
								scad_updateFingerPosAvatar([36,37,38],{"distal":[ran_dis1R,ran_dis2R,ran_dis3R],"medial":[ran_med1R,ran_med2R,ran_med3R],"proximal":[ran_pro1R,ran_pro2R,ran_pro3R]});	
							};

							var contCan=new scad_ctrlPanel(contPopB.getHandler(),"id_conteCan","conte_canPop");
							

							var contToolLeft=new scad_ctrlPanel(contPopB.getHandler(),"id_conteToolL","conte_Tool");
							var contTLContBtn=new scad_ctrlPanel(contToolLeft.getHandler(),"","conte_headBtn");
							contTLContBtn.addTextPanel("Mano izquierda");
							/*NEW*/
							await scad_ctrlCheckBox(contTLContBtn,"id_btn_brazoL","btn_cadD","Brazo","radios1");
							await scad_ctrlCheckBox(contTLContBtn,"id_btn_anteBrazoL","btn_cadD","Antebrazo","radios1");
							await scad_ctrlCheckBox(contTLContBtn,"id_btn_munecaL","btn_cadD","Muñeca","radios1");
							/**********/
							await scad_ctrlCheckBox(contTLContBtn,"id_btn_pulgarL","btn_cadD","Pulgar","radios1");
							await scad_ctrlCheckBox(contTLContBtn,"id_btn_indiceL","btn_cadD","Índice","radios1");
							await scad_ctrlCheckBox(contTLContBtn,"id_btn_medioL","btn_cadD","Medio","radios1");
							await scad_ctrlCheckBox(contTLContBtn,"id_btn_anularL","btn_cadD","Anular","radios1");
							await scad_ctrlCheckBox(contTLContBtn,"id_btn_meniqueL","btn_cadD","Meñique","radios1");

							//await new Promise(resolve => setTimeout(resolve, 1000));
							/*NEW*/
							var r_brazo = document.getElementById("id_btn_brazoL");
							var r_anteBrazo = document.getElementById("id_btn_anteBrazoL");
							var r_muneca = document.getElementById("id_btn_munecaL");
							/********/
							var r_pul = document.getElementById("id_btn_pulgarL");
							var r_ind = document.getElementById("id_btn_indiceL");
							var r_med = document.getElementById("id_btn_medioL");
							var r_anu = document.getElementById("id_btn_anularL");
							var r_men = document.getElementById("id_btn_meniqueL");
							


							var contTLContFal=new scad_ctrlPanel(contToolLeft.getHandler(),"","conte_bodyBtn");
							//contTLContFal.addTextPanel("Falange");

							var contTLCFal1=new scad_ctrlPanel(contTLContFal.getHandler(),"conte_distal_1L","conte_distal");
							contTLCFal1.addTextPanel("Distal");
							let ran_dis1=scad_ctrlRange(contTLCFal1,"id_rangeDistalx","range_","X","0");
							let ran_dis2=scad_ctrlRange(contTLCFal1,"id_rangeDistaly","range_","Y","0");
							let ran_dis3=scad_ctrlRange(contTLCFal1,"id_rangeDistalz","range_","Z","0");

							var contTLCFal2=new scad_ctrlPanel(contTLContFal.getHandler(),"conte_distal_2L","conte_distal");
							contTLCFal2.addTextPanel("Medial");
							let ran_med1=scad_ctrlRange(contTLCFal2,"id_rangeMedialx","range_","X","0");
							let ran_med2=scad_ctrlRange(contTLCFal2,"id_rangeMedialy","range_","Y","0");
							let ran_med3=scad_ctrlRange(contTLCFal2,"id_rangeMedialz","range_","Z","0");

							var contTLCFal3=new scad_ctrlPanel(contTLContFal.getHandler(),"conte_distal_3L","conte_distal");
							contTLCFal3.addTextPanel("Proximal");
							let ran_pro1=scad_ctrlRange(contTLCFal3,"id_rangeProximalx","range_","X","0");
							let ran_pro2=scad_ctrlRange(contTLCFal3,"id_rangeProximaly","range_","Y","0");
							let ran_pro3=scad_ctrlRange(contTLCFal3,"id_rangeProximalz","range_","Z","0");

							//contTLContFal.getHandler().innerHTML= '<input type="range" text ="Hola"  id="id_range min="0" max="100" oninput="rangevalue.value=value"" /><output id="rangevalue">0</output>';
							/*NEW*/
							r_brazo.onchange=function(){
								scad_hiddenP(["conte_distal_1L","conte_distal_2L","conte_distal_3L"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===27){
										scad_updateRange([ran_dis1,ran_dis2,ran_dis3],coor[index]);
									}										
								}
								scad_updateFingerPosAvatar([27,0,0],{"distal":[ran_dis1,ran_dis2,ran_dis3],"medial":[ran_med1,ran_med2,ran_med3],"proximal":[ran_pro1,ran_pro2,ran_pro3]});
							};
							r_anteBrazo.onchange=function(){
								scad_hiddenP(["conte_distal_1L","conte_distal_2L","conte_distal_3L"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===14){
										scad_updateRange([ran_dis1,ran_dis2,ran_dis3],coor[index]);
									}										
								}
								scad_updateFingerPosAvatar([14,0,0],{"distal":[ran_dis1,ran_dis2,ran_dis3],"medial":[ran_med1,ran_med2,ran_med3],"proximal":[ran_pro1,ran_pro2,ran_pro3]});
							};
							r_muneca.onchange=function(){
								scad_hiddenP(["conte_distal_1L","conte_distal_2L","conte_distal_3L"]);
								
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===7){
										scad_updateRange([ran_dis1,ran_dis2,ran_dis3],coor[index]);
									}										
								}
								scad_updateFingerPosAvatar([7,0,0],{"distal":[ran_dis1,ran_dis2,ran_dis3],"medial":[ran_med1,ran_med2,ran_med3],"proximal":[ran_pro1,ran_pro2,ran_pro3]});
							};
							/******/
							r_pul.onclick=function(){
								scad_showP(["conte_distal_1L","conte_distal_2L","conte_distal_3L"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===23){
										scad_updateRange([ran_dis1,ran_dis2,ran_dis3],coor[index]);
									}
									if(coor[index][0]===24){
										scad_updateRange([ran_med1,ran_med2,ran_med3],coor[index]);
									}
									if(coor[index][0]===25){
										scad_updateRange([ran_pro1,ran_pro2,ran_pro3],coor[index]);
									}
										
								}
								
								scad_updateFingerPosAvatar([23,24,25],{"distal":[ran_dis1,ran_dis2,ran_dis3],"medial":[ran_med1,ran_med2,ran_med3],"proximal":[ran_pro1,ran_pro2,ran_pro3]});
							};
							r_ind.onclick=function(){
								scad_showP(["conte_distal_1L","conte_distal_2L","conte_distal_3L"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===8){
										scad_updateRange([ran_dis1,ran_dis2,ran_dis3],coor[index]);
									}
									if(coor[index][0]===9){
										scad_updateRange([ran_med1,ran_med2,ran_med3],coor[index]);	
									}
									if(coor[index][0]===10){
										scad_updateRange([ran_pro1,ran_pro2,ran_pro3],coor[index]);	
									}
										
								}
								scad_updateFingerPosAvatar([8,9,10],{"distal":[ran_dis1,ran_dis2,ran_dis3],"medial":[ran_med1,ran_med2,ran_med3],"proximal":[ran_pro1,ran_pro2,ran_pro3]});
							};
							r_med.onclick=function(){
								scad_showP(["conte_distal_1L","conte_distal_2L","conte_distal_3L"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===16){
										scad_updateRange([ran_dis1,ran_dis2,ran_dis3],coor[index]);
									}
									if(coor[index][0]===17){
										scad_updateRange([ran_med1,ran_med2,ran_med3],coor[index]);	
									}
									if(coor[index][0]===18){
										scad_updateRange([ran_pro1,ran_pro2,ran_pro3],coor[index]);	
									}
										
								}
								scad_updateFingerPosAvatar([16,17,18],{"distal":[ran_dis1,ran_dis2,ran_dis3],"medial":[ran_med1,ran_med2,ran_med3],"proximal":[ran_pro1,ran_pro2,ran_pro3]});
							};
							r_anu.onclick=function(){
								scad_showP(["conte_distal_1L","conte_distal_2L","conte_distal_3L"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===19){
										scad_updateRange([ran_dis1,ran_dis2,ran_dis3],coor[index]);
									}
									if(coor[index][0]===20){
										scad_updateRange([ran_med1,ran_med2,ran_med3],coor[index]);	
									}
									if(coor[index][0]===21){
										scad_updateRange([ran_pro1,ran_pro2,ran_pro3],coor[index]);	
									}
										
								}
								scad_updateFingerPosAvatar([19,20,21],{"distal":[ran_dis1,ran_dis2,ran_dis3],"medial":[ran_med1,ran_med2,ran_med3],"proximal":[ran_pro1,ran_pro2,ran_pro3]});
							};
							r_men.onclick=function(){
								scad_showP(["conte_distal_1L","conte_distal_2L","conte_distal_3L"]);
								for (let index = 0; index < coor.length; index++) {
									if(coor[index][0]===11){
										/*Función que actuliza el valor del rango segun dedo seleccionado*/
										scad_updateRange([ran_dis1,ran_dis2,ran_dis3],coor[index]);	
									}
									if(coor[index][0]===12){
										scad_updateRange([ran_med1,ran_med2,ran_med3],coor[index]);	
									}
									if(coor[index][0]===13){
										scad_updateRange([ran_pro1,ran_pro2,ran_pro3],coor[index]);		
									}	
								}
								//json_ = {"distal":[],"medial":[],"proximal":[]}; //tiene que estar ordenado
								scad_updateFingerPosAvatar([11,12,13],{"distal":[ran_dis1,ran_dis2,ran_dis3],"medial":[ran_med1,ran_med2,ran_med3],"proximal":[ran_pro1,ran_pro2,ran_pro3]});	
							};



							var contAv=new scad_ctrlPanel(contCan.getHandler(),"cam_DashBody_pop","scad_conImgPersonaje");
							//contAv.addColorPanel("black");
							var contBtn=new scad_ctrlPanel(contPopB.getHandler(),"id_conteBtn","conte_btnPop");
							var btn_guardar=new scad_ctrlBoton(contBtn.getHandler(),"id_btn_guardarPop","btn_guardarPop");
							btn_guardar.typeBut("button");
							btn_guardar.addTextButton("Establecer");
							
							siarp_initDrawVRM_pop();
							
							siarp_setMovCoor(coor);
							
							btn_guardar.getHandler().onclick=function(){
								let conf_g=new scad_ctrlConfirm(document.body,"acept/cancel",null,functOk_g);
								conf_g.addTxtHead("Aviso");
								conf_g.addTextBody("¿Está seguro que desea establecer los nuevos valores de posición?");
								async function functOk_g(){
									let coor_new=siarp_getDataVRM2();

									listaShot[lenChild]=coor_new;
									coor=coor_new;
									item.innerHTML=coor[0][1]+coor[1][1]+coor[2][1];


									await animacion_desvanecer(contPop.getHandler(),1000);
									//await contPop.destroy();
									siarp_initDrawVRM();

									
									return;
								};
							};
							
							btn_ext.getHandler().onclick=async function(){
								//await contPop.destroy();
								await animacion_desvanecer(contPop.getHandler(),1000);
								siarp_initDrawVRM();
							};
						};
						listaShot.push(coor);
					}else{
						var msg=new scad_ctrlConfirm(document.body,"acept",null,null);
						msg.addTxtHead("¡Aviso!");
						msg.addTextBody("Número de movimientos máximo es 5.");
					}
				};
			}
		};
		
		
		contButtonsCamOn.addImageButton("scad/assets/img/scad_demoRegister/camaraOn.png");
		
		var contButtonShot=new scad_ctrlBoton(contConfTools.getHandler(),"btnShot","scad_confPaswBtn");
		contButtonShot.typeBut("button");
		contButtonShot.addTextButton("Shot");
		contButtonShot.getHandler().disabled=true;

		var contButtonClear=new scad_ctrlBoton(contConfTools.getHandler(),"btnClearShot","scad_confPaswBtn");
		contButtonClear.typeBut("button");
		contButtonClear.addImageButton("scad/assets/img/scad_demoRegister/clear.png");
		contButtonClear.getHandler().onclick=function(){	
			var lenChild = contLiShot.getHandler().childNodes.length;
			if(lenChild>0){
				
				while (contLiShot.getHandler().firstChild) {
					contLiShot.getHandler().removeChild(contLiShot.getHandler().firstChild);
				}
				listaShot=[];
			}else{
				var msg=new scad_ctrlConfirm(document.body,"acept",null,null);
				msg.addTxtHead("¡Aviso!");
				msg.addTextBody("No existe 'Shot' en la lista para eliminar.");
			}
		};
		/////////////////////////  SEGUNDO PANEL //////////////////////////////////
		
		var contSecondPanel=new scad_ctrlPanel(contConfElem.getHandler(),"id","scad_conPersonaje");
		var contPersonaje=new scad_ctrlPanel(contSecondPanel.getHandler(),"cam_DashBody","scad_conImgPersonaje");
		
		contPersonaje.addColorPanel("black");
		//contPersonaje.addImagePanel("scad/assets/img/scad_demoRegister/fondo2.jpg","1");

		siarp_initDrawVRM();
	}

};

function scad_ctrlCheckBox(parent,id,clase,texto,nombre){

	let lbl=scad_insertobj(parent.getHandler(),"label","class",clase+"_lbl","id",id+"_lbl");
	let chk=scad_insertobj(lbl,"input","type","radio","id",id,"class",clase,"name",nombre);
	let span= scad_insertobj(lbl,"span","class",clase+"_span","id",id+"_span");
	scad_insertobj(span,"text",texto);
	return chk;
};
function scad_ctrlRange(parent,id,clase,texto,val_init){
	let lbl=scad_insertobj(parent.getHandler(),"label","class",clase+"_lbl");
	lbl.innerHTML=texto;
	let range=scad_insertobj(parent.getHandler(),"input","type","range","id",id,"class",clase,"oninput",id+"value.value=value");
	range.value="0";
	range.setAttribute("min","-2");
	range.setAttribute("max","2");
	range.setAttribute("step","0.001");
	let output=scad_insertobj(parent.getHandler(),"input","id",id+"value","class","input_range");
	output.value=val_init;


	range.addEventListener("wheel", function(e){
		if (e.deltaY < 0){
			range.valueAsNumber += 0.01;
			output.value=range.value;
		}else{
			range.value -= 0.01;
			output.value=range.value;
		}
		e.preventDefault();
		e.stopPropagation();
	  })
	  return [range,output];
};
//range=[range1,range2,range3]
//coor=coor[index]
function scad_updateRange(range,coor){
	range[0][0].value=coor[1][0][0];
	range[0][1].value=coor[1][0][0];
	range[1][0].value=coor[1][0][1];
	range[1][1].value=coor[1][0][1];
	range[2][0].value=coor[1][0][2];
	range[2][1].value=coor[1][0][2];
};

//json_ = {"distal":[],"medial":[],"proximal":[]}; //tiene que estar ordenado
//part = [11,12,13]; //tiene que estar ordenado
function scad_updateFingerPosAvatar(part,range){
	/*
			MOVIMIENTO DEL AVATAR CON EL RANGO
	 */
	/*Distal */
	range.distal[0][0].onchange=function(){
		siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
	};
	range.distal[1][0].onchange=function(){
		siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
	};
	range.distal[2][0].onchange=function(){
		siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
	};
	/*Medial */
	range.medial[0][0].onchange=function(){
		siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][0].value);
	};
	range.medial[1][0].onchange=function(){
		siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][0].value);
	};
	range.medial[2][0].onchange=function(){
		siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][0].value);
	};
	/*proximal */
	range.proximal[0][0].onchange=function(){
		console.log("Hice cambio");
		siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][0].value);
	};
	range.proximal[1][0].onchange=function(){
		siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][0].value);
	};
	range.proximal[2][0].onchange=function(){
		siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][0].value);
	};
	/*
			MOVIMIENTO DEL AVATAR INGRESANDO COORDENADAS
	*/
	/*Distal */
	range.distal[0][1].onchange=function(){
		siarp_setRotationPart(part[0],range.distal[0][1].value,range.distal[1][0].value,range.distal[2][0].value);
	};
	range.distal[1][1].onchange=function(){
		siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][1].value,range.distal[2][0].value);
	};
	range.distal[2][1].onchange=function(){
		siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][1].value);
	};
	/*Medial */
	range.medial[0][1].onchange=function(){
		siarp_setRotationPart(part[1],range.medial[0][1].value,range.medial[1][0].value,range.medial[2][0].value);
	};
	range.medial[1][1].onchange=function(){
		siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][1].value,range.medial[2][0].value);
	};
	range.medial[2][1].onchange=function(){
		siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][1].value);
	};
	/*proximal */
	range.proximal[0][0].onchange=function(){
		console.log("Hice cambio");
		siarp_setRotationPart(part[2],range.proximal[0][1].value,range.proximal[1][0].value,range.proximal[2][0].value);
	};
	range.proximal[1][0].onchange=function(){
		siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][1].value,range.proximal[2][0].value);
	};
	range.proximal[2][0].onchange=function(){
		siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][1].value);
	};
	/*
			MOVIMIENTO DE AVATAR CON EL SCROLL
	*/
	/*Distal */
	range.distal[0][0].onwheel= function(){
	
		siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
	
  	}
	range.distal[1][0].onwheel= function(){
	
		siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
	
  	}
	range.distal[2][0].onwheel= function(){
		
		siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
		
	}
	/*Medial */
	range.medial[0][0].onwheel= function(){
		
		siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][0].value);
		
	}
	range.medial[1][0].onwheel= function(){
		
		siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][0].value);
		
		
	}
	range.medial[2][0].onwheel= function(){
		
		siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][0].value);
		
	}
	/*proximal */
	range.proximal[0][0].onwheel= function(){
		
		siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][0].value);
		
	}
	range.proximal[1][0].onwheel= function(){
		
		siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][0].value);
		
	}
	range.proximal[2][0].onwheel= function(){
		
		siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][0].value);	
	}
	
};		
function scad_hiddenP(ids){
	document.getElementById(ids[0]).style="grid-template-columns: 1fr 2fr 2fr;";
	document.getElementById(ids[0]).firstElementChild.style="display:none;";
	document.getElementById(ids[1]).style="display:none;";
	document.getElementById(ids[2]).style="display:none;";
};		
function scad_showP(ids){
	document.getElementById(ids[0]).style="grid-template-columns: none;";
	document.getElementById(ids[0]).firstElementChild.style="display:grid;";
	document.getElementById(ids[1]).style="display:grid;";
	document.getElementById(ids[2]).style="display:grid;";
}			
//var control_global=0;	
//var control_global_f=0;	
//var control_global_parte=[];
//function scad_updateFingerPosAvatar2(part,range,finger){
//	//let wheelEventEndTimeout = null;
//	control_global_parte=part;	
////if(control_global_f!=0) return;
////control_global_f=1;
//
//	console.log(part[0]);
//	range.distal[0][0].addEventListener("wheel", function(e){
//		console.log(!(control_global));
//		//console.log(this);
//		
//		//if(!(control_global))
//		//	{	
//				control_global=1;
//				console.log(control_global_parte);
//				siarp_setRotationPart(control_global_parte[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
//				
//				control_global=0;
//				//range.distal[0][0].removeEventListener('wheel', null);
//		//	}
//			
//
//			//siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
//			//
//			//clearTimeout(wheelEventEndTimeout);
//			//wheelEventEndTimeout = setTimeout(() => {
//			//	console.log('wheel end');
//			//}, 100);
//	})
//
//	range.distal[1][0].onwheel= function(){
//	
//			siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
//		
//	  }
//	range.distal[2][0].onwheel= function(){
//		
//			siarp_setRotationPart(part[0],range.distal[0][0].value,range.distal[1][0].value,range.distal[2][0].value);
//		
//	  }
//	/*Medial */
//	range.medial[0][0].onwheel= function(){
//		
//			siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][0].value);
//		
//	  }
//	range.medial[1][0].onwheel= function(){
//		
//			siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][0].value);
//		
//		
//	  }
//	range.medial[2][0].onwheel= function(){
//		
//			siarp_setRotationPart(part[1],range.medial[0][0].value,range.medial[1][0].value,range.medial[2][0].value);
//		
//	  }
//	/*proximal */
//	range.proximal[0][0].onwheel= function(){
//		
//			siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][0].value);
//		
//	  }
//	range.proximal[1][0].onwheel= function(){
//		
//			siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][0].value);
//		
//	  }
//	range.proximal[2][0].onwheel= function(){
//		
//			siarp_setRotationPart(part[2],range.proximal[0][0].value,range.proximal[1][0].value,range.proximal[2][0].value);
//		
//	  }
//	
//}




createRegister();

