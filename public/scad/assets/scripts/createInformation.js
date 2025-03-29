import { siarp_initDrawVRM,siarp_getDataVRM,siarp_moveVRM,siarp_voz,siarp_audioPause} from '../../../script.js';

function createInformation()
{
	createPageInformation();
	
};
function createPageInformation()
{
	///////////////// CREACION DE LA PAGINA ///////////////////
	var contGrnl=new scad_ctrlPanel(document.body,"id","class");
	
	contGrnl.addPosition("absolute");
	contGrnl.sizePanel("100%","100%");
	contGrnl.addImagePanel("scad/assets/img/scad_demoRegister/fondo.jpg","1");
	
	var contConfElem=new scad_ctrlPanel(contGrnl.getHandler(),"id","scad_confPanelPrinInfo");
	var contGnrlBtnHome=new scad_ctrlPanel(contConfElem.getHandler(),"id","contDivBtnHome");
	var contBtnHome=new scad_ctrlPanel(contGnrlBtnHome.getHandler(),null,"contBtnHome");
	contBtnHome.sizePanel("70px","calc(100% - 1px)");
	var btnImgHome=new scad_ctrlBoton(contBtnHome.getHandler(),"btnHome","btnHome");
	btnImgHome.typeBut("button");
	btnImgHome.addImageButton("scad/assets/img/scad_demoRegister/home.png");
	btnImgHome.addTooltip("Home");
	btnImgHome.getHandler().onclick=function(){window.open('index.html', '_self')};
	
	var contConfElem2=new scad_ctrlPanel(contConfElem.getHandler(),"id","scad_contElemInfo");
	var contConfTitle=new scad_ctrlPanel(contConfElem2.getHandler(),"id","scad_conTitleInfo");
	contConfTitle.addTextPanel("Datos de Acciones");
	
	var contConfForm=new scad_ctrlPanel(contConfElem2.getHandler(),"id","scad_conTableInfo");
	
	
	
	var sendParam='{"opera":"10","date":"'+scad_util_getTime("date")+'","time":"'+scad_util_getTime("time")+'"}';

	var ptr=new scad_sysData("/siarp_acciones.json","POST",sendParam,scad_buildTable,null,null,null,null,null);
	ptr.setSync(false);		
	ptr.setReturnType("json");
	ptr.setSendType("json");		
	ptr.send(); 	
	function scad_buildTable(data,param)
	{
		var jsonTable={"head":["Id","Accion","voz","Descripcion","Fecha","Hora"],"body":data["data"]};
		var emp_table= new scad_ctrlTable(contConfForm.getHandler());
		emp_table.createTable("scad_SCA_empTable");
		emp_table.setColHidden(3);
		emp_table.drawtable(null,jsonTable);
		emp_table.insertPagination("paginator");			
		emp_table.paginatorBrigde({table: emp_table.table,box: emp_table.pag,active_class: "color_page",num:10});	
		emp_table.setOnclickDelete(scad_deleteAction,emp_table);
		
		function scad_deleteAction(e,objTable)
		{
			var msg=new scad_ctrlConfirm(document.body,"yes/no",null,functYes);
			msg.addTxtHead("Confirmación");
			msg.addTextBody("¿Esta seguro que desea eliminar esta Acción?");
			//msg.addImgBody()
			function functYes()
			{
				
				//console.log(objTable.JsonTable["body"][e.rowIndex-1]);
				var id_action=objTable.JsonTable["body"][e.rowIndex-1][0];
				var reqDelete='{"opera":"50","date":"'+scad_util_getTime("date")+'","time":"'+scad_util_getTime("time")+'","id_accion":"'+id_action+'"}';
				//operaService
				//console.log(reqDelete);
				var ptr2=new scad_sysData("/siarp_acciones.json","POST",reqDelete,deleteAction,null,null,null,null,null);
				ptr2.setSync(false);		
				ptr2.setReturnType("json");		
				ptr2.send(); 
				
				function deleteAction(data)
				{
					//console.log(data);
					if(data["rc"]=="0") emp_table.deleteRowIndex(e.rowIndex);
					//console.log(emp_table.getDataTable());
				};

				
			};
			
		};
			
		emp_table.paginatorBrigde({table: emp_table.table,box: emp_table.pag,active_class: "color_page",num:10});
		emp_table.table.onclick =async function(e){
			console.log(e);
			var fila = e.target.closest("tr");
			if(e.target.localName!="td")return;
			
			console.log(emp_table.JsonTable["body"][fila.rowIndex-1][0]);
			siarp_moveVRM(emp_table.JsonTable["body"][fila.rowIndex-1][0]);
			//console.log(emp_table.JsonTable["body"][e.path[1].rowIndex-1]);
			siarp_voz(emp_table.JsonTable["body"][fila.rowIndex-1][2]);
			siarp_audioPause();
		};
	};                  		
	/////////////////////////  SEGUNDO PANEL //////////////////////////////////	
	var contSecondPanel=new scad_ctrlPanel(contConfElem.getHandler(),"id","scad_conPersonaje");
	var contPersonaje=new scad_ctrlPanel(contSecondPanel.getHandler(),"cam_DashBody","scad_conImgPersonajeInfo");
	//contPersonaje.addImagePanel("scad/assets/img/scad_demoRegister/animeFondo.gif","1");
	contPersonaje.addColorPanel("black");
	siarp_initDrawVRM();
	contSecondPanel.getHandler().onclick=()=>{console.log(siarp_getDataVRM());}
}
createInformation();
