


const mssql = require('mssql');
module.exports=class Sql{
    constructor(stringConnection){
        this.stringConnection=stringConnection;
    }
/*===============F-CONN=============*/

    async connect(){
        mssql.on('error',err=>{
            console.log(err);
            mssql.close();
        });
         var rc=await mssql.connect(this.stringConnection);
         return rc;
        
    }
/*===============F-DISC=============*/
    close(){
        return mssql.close();
    }
/*============================EX-STORE PROCEDURE=========================*/
/*=========================SP-QUERY EJ=============================*/
    async select(table) {
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request().query(`select * from ${table}`);
            }).then(result => {
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
/*=========================SP-C-ACCTION=============================*/
    async execStoreProcedureParam2(storeProcedure, parameter1, parameter2,parameter3,parameter4,parameter5){
        return new Promise((resolve, reject) => {
            mssql.mipool=pool;
            this.connect().then(pool => {
                return pool.request() 
                    .input("p_nombre", mssql.NVarChar, parameter1)
                    .input("p_voz", mssql.NVarChar, parameter2)
                    .input("p_descripcion", mssql.NVarChar, parameter3)
                    .input("p_date", mssql.NVarChar, parameter4)
                    .input("p_time", mssql.NVarChar, parameter5)
                    .output("p_idA", mssql.Int)
                    .execute(storeProcedure);
            }).then(result => {
                mssql.mipool.close();
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
/*=========================SP-C-BODY P=============================*/
    async execStoreProcedureParam1(storeProcedure, parameter1){
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                mssql.mipool=pool;
                return pool.request() 
                    .input("p_nombre", mssql.NVarChar, parameter1)
                    .execute(storeProcedure);
            }).then(result => {
                mssql.mipool.close();
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
/*=========================SP-RES-LIST=============================*/
    async execStoreProcedureParam1Out(storeProcedure){
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                mssql.mipool=pool;
                return pool.request() 
                    .output("p_res", mssql.NVarChar)
                    .execute(storeProcedure);
            }).then(result => {
                mssql.mipool.close();
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
/*=========================SP-C-ACC_BO=============================*/
    async execStoreProcedureParamAPC(storeProcedure, parameter1,parameter2,parameter3){
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                mssql.mipool=pool;
                return pool.request() 
                    .input("p_data", mssql.NVarChar, parameter1)
                    .input("p_date", mssql.NVarChar, parameter2)
                    .input("p_time", mssql.NVarChar, parameter3)
                    .output("p_id", mssql.Int)
                    .execute(storeProcedure);
            }).then(result => {
                mssql.mipool.close();
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

/*==========================SP-D-ACC=============================================*/
    async execStoreProcedureDel(storeProcedure, parameter1){
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                mssql.mipool=pool;
                return pool.request() 
                    .input("p_id", mssql.Int, parameter1)
                    .execute(storeProcedure);
            }).then(result => {
                //console.log(mssql.mipool);
                mssql.mipool.close();
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
/*==========================SP-COOR-LIST=============================================*/
    async execStoreProcedureLcoor(storeProcedure, parameter1){
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                mssql.mipool=pool;
                return pool.request() 
                    .input("p_id", mssql.Int, parameter1)
                    .output("p_res", mssql.VarChar)
                    .execute(storeProcedure);
            }).then(result => {
                mssql.mipool.close();
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

