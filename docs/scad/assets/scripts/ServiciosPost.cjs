const fun_ = (req)=>{
console.log("servicio");
    console.log('hola11111111111',req);//imprimo Json de requerimeinto
	return '{"opera":11,"rc":0,"descrp":"ok", "data":[[18,"Mesa","bienvenido ñor",""],[2,"Cómo estás","bien",""],[3,"Sonríe","eres divertido",""]]}';
};


const config = require("./db/config.cjs");
const sqlConnection = require("./db/sql.cjs");
const sql = new sqlConnection(config.sqlConfig);

/*
    ===========================
    SERVICIOS CRUD DE ACCIONES
    ===========================
*/
const fun =async (req)=>{
    req=JSON.parse(req);
    req.body=req;
    if(req.body.opera==10){
        let rs_accion = await sql.execStoreProcedureParam1Out('sp_listaAcciones');
        let rs_sp=JSON.parse(rs_accion.output.p_res);
        var data_rs = [];
        if(rs_sp){
            for(let i=0;i<rs_sp.length;i++){
                data_rs.push([rs_sp[i]["id"],rs_sp[i]["nom"],rs_sp[i]["voz"],rs_sp[i]["des"],rs_sp[i]["date"],rs_sp[i]["time"]]);
            }
            return JSON.stringify({
                "opera":"11",
                "rc":"0",
                "descrp":"ok",
                "data":data_rs
            });
        }else{
            return JSON.stringify({
                "opera":"11",
                "rc":"1",
                "descrp":"err",
                "data":""
            });
        }
    }else if(req.body.opera==20){
        let rs_pcuerpo = await sql.execStoreProcedureParam1Out('sp_listaPcuerpo');
        let rs_sp=JSON.parse(rs_pcuerpo.output.p_res);
        
        var data_rs = [];
        for(let i=0; i<rs_sp.length;i++){
            
            var enable;
            if(rs_sp[i]["enabled"]===0){
                enable=false;
            }else{
                enable=true;
            }
            data_rs.push([rs_sp[i]["id"],rs_sp[i]["nom"],enable]);
        }
        if(rs_sp){
            return JSON.stringify({
                "opera":"21",
                "rc":"0",
                "descrp":"ok",
                "data":data_rs
            });
        }else{
            return JSON.stringify({
                "opera":"21",
                "rc":"1",
                "descrp":"err",
                "data":""
            });
        }

    }else if(req.body.opera==30){
        let rs_ac_pcu = await sql.execStoreProcedureParam1Out('sp_listaAcc_cuerpo');
        let rs_sp=JSON.parse(rs_ac_pcu.output.p_res);
        let data_rs = [];
        let fil_id = [];
        let group_d ={} ;
       
       
        if(rs_sp){
            for(let i = 0; i < rs_sp.length; i++) {
                const el_id = rs_sp[i]["id_ac"];
                if (!fil_id.includes(rs_sp[i]["id_ac"])) {
                  fil_id.push(el_id);
                }
              }
      
              rs_sp.forEach(id_a => {
                var valx=id_a.CX;
                var valy=id_a.CY;  
                var valz=id_a.CZ;
               
                if(valx<0.00001 && valx>-0.00001) valx=0;
                if(valy<0.00001 && valy>-0.00001) valy=0;
                if(valz<0.00001 && valz>-0.00001) valz=0;
                

                if( group_d[id_a.id_ac] )
                  group_d[id_a.id_ac].push([id_a.id_pcu,valx,valy,valz]);
                  else
                  (group_d[id_a.id_ac] = [], 
                      group_d[id_a.id_ac].push([id_a.id_pcu,valx,valy,valz]));
              })
      
              for(let i=0;i<fil_id.length;i++){
                  data_rs.push([fil_id[i],group_d[fil_id[i]]]); 
              }
            return JSON.stringify({
                "opera":"31",
                "rc":"0",
                "descrp":"ok",
                "data":data_rs
            });
        }else{
            return JSON.stringify({
                "opera":"31",
                "rc":"1",
                "descrp":"err",
                "data":"" 
            });
        }
    }else if(req.body.opera==40){
        const data_ac=req.body.data;
        var val1= JSON.stringify(data_ac);
        var val2=req.body.date;
        var val3=req.body.time;
        //console.log(val2);
        //console.log(val3);
        //console.log("==================================================================");
        //let rs_acc_pcu = await sql.execStoreProcedureParamAPC('sp_insertNuevaAcc',val1,val2,val3);
        let rs_acc_pcu = await sql.execStoreProcedureParamAPC('sp_insertarNuevaAcc_alt',val1,val2,val3);
        let rc_sp=rs_acc_pcu.output.p_id;
        if(rc_sp){
            return JSON.stringify({
                "opera":"41",
                "rc":"0",
                "descrp":"ok"
            });
        }else{
            return JSON.stringify({
                "opera":"41",
                "rc":"1",
                "descrp":"err"
            });
        }
        //console.log(rs_acc_pcu.output.p_id);
       
    } else if(req.body.opera==50){
        const id_ac=req.body.id_accion;
        let rs_del_ac_pc = await sql.execStoreProcedureDel('sp_eliminarAcc_cuerpo',id_ac);
        let rs_del_ac = sql.execStoreProcedureDel('sp_eliminarAccion',id_ac);
        return JSON.stringify({
            "opera":"51",
            "rc":"0",
            "descrp":"ok"
        });
    }else if(req.body.opera==60){
        
        const id_ac=req.body.id_accion;
        let rs_list_coor= await sql.execStoreProcedureLcoor('sp_listaCoorAc',id_ac);
        let rs_sp=JSON.parse(rs_list_coor.output.p_res);
        let data_rs = [];
        let group_d ={} ;
    
         
        if(rs_sp){
            
            rs_sp.forEach(id_a => {
                var coor=id_a.coor;
            
                
    
                if( group_d[id_a.id_ac] )
                    group_d[id_a.id_ac].push([id_a.id_pcu,coor]);
                else
                    (group_d[id_a.id_ac] = [], 
                    group_d[id_a.id_ac].push([id_a.id_pcu,coor]));
            });
            data_rs.push([parseInt(id_ac),group_d[id_ac]]);
            return JSON.stringify({
                "opera":"61",
                "rc":"0",
                "descrp":"ok",
                "data":data_rs
            });
        }else{
            return JSON.stringify({
                "opera":"61",
                "rc":"1",
                "descrp":"err"
            });
        }
        
    }else{
        return JSON.stringify({
            "mssg":"Request not found"
        });
    }
    
};


module.exports = {
    fun,
    url:'/siarp_acciones.json'
}
