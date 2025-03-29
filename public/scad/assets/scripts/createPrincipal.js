import { siarp_initDrawVRM, siarp_audioStart, siarp_audioPause, siarp_audioResume } from '../../../../script.js';
function scad_PagePrincipal()
{
	createPagePrincipal();
};
/*===========================================hhhhhj=============*/
function createPagePrincipal()
{
	var contGrnl=new scad_ctrlPanel(document.body,"id","class");
	contGrnl.addPosition("absolute");
	contGrnl.sizePanel("100%","100%");
	contGrnl.addImagePanel("scad/assets/img/scad_demoRegister/fondo.jpg","1");

	var contGrnlSon=new scad_ctrlPanel(contGrnl.getHandler(),"scad_DashArea","cam_DashArea");
	
	contGrnlSon.addPosition("absolute");
	contGrnlSon.sizePanel("90%","95%");
	contGrnlSon.movePanel("5%","2%",true);	
			
	var contSonBody=new scad_ctrlPanel(contGrnlSon.getHandler(),"cam_DashBody","cam_DashBody");
	contSonBody.addPosition("absolute");
	contSonBody.sizePanel("100%","100%");
	contSonBody.movePanel("0%","0%",true);
	contSonBody.addColorPanel("black");
	//contSonBody.addImagePanel("scad/assets/img/scad_demoRegister/animeFondo.gif","1");
	var contSubMenu=new scad_ctrlPanel(contGrnlSon.getHandler(),"cam_DashButtons","cam_DashButtons");
	
	var contBtnStart=new scad_ctrlBoton(contSubMenu.getHandler(),"butt_upAllProc","cam_DashButt");
	contBtnStart.addTooltip("Empezar");
	contBtnStart.addImageButton("scad/assets/img/scad_demoRegister/start.png");
	contBtnStart.getHandler().onclick=()=>{
		contBtnPausa.showButton("inline-block");
		contBtnStart.hiddenButton();
		if(siarp_audioStart!=null)		
			siarp_audioStart();	
		};
		
	var contBtnPausa=new scad_ctrlBoton(contSubMenu.getHandler(),"butt_stop","cam_DashButt");
	contBtnPausa.addTooltip("Pausar");
	contBtnPausa.addImageButton("scad/assets/img/scad_demoRegister/pausa.png");
	contBtnPausa.hiddenButton();
	
	contBtnPausa.getHandler().onclick=function()
	{
		contBtnStart.showButton("inline-block");
		contBtnPausa.hiddenButton();
		if(siarp_audioPause!=null)siarp_audioPause();
	};
	
	var contBtnRegister=new scad_ctrlBoton(contSubMenu.getHandler(),"butt_upAllProc","cam_DashButt");
	contBtnRegister.addTooltip("Registrar");
	contBtnRegister.addImageButton("scad/assets/img/scad_demoRegister/register.png");
	
	contBtnRegister.getHandler().onclick=function(){window.open('indexRegister.html', '_self')};
	
	

	var contBtnData=new scad_ctrlBoton(contSubMenu.getHandler(),"butt_upAllProc","cam_DashButt");
	contBtnData.addTooltip("View");
	contBtnData.addImageButton("scad/assets/img/scad_demoRegister/data.png");
	contBtnData.getHandler().onclick=function(){window.open('indexInformation.html', '_self')};
	
	var contBtnScreem=new scad_ctrlBoton(contSubMenu.getHandler(),"butt_screemAll","cam_DashButt");
	contBtnScreem.addTooltip("Screem");
	contBtnScreem.addImageButton("scad/assets/img/scad_demoRegister/screem.png");
	contBtnScreem.getHandler().onclick=function(){contSonBody.fullScreen()};
	
	siarp_initDrawVRM();
};
scad_PagePrincipal();
