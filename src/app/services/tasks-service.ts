import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatoF } from '../interfaces/interfaces';
import { JsonPipe } from '@angular/common';
import { promise } from 'protractor';

export class TasksService {
    db: SQLiteObject = null;
    activos: DatoF[] = [];
    cc: any;
    row_data: any[] = [];
    constructor() {
      
     }

    setDatabase(db: SQLiteObject){
        if(this.db === null){
          this.db = db;
        }
      }


      deleteTableCaptura(){
        let sql = 'DELETE FROM captura; ';
        console.log("sql " +sql);
        this.db.executeSql(sql, []).then(()=>{
          console.log("Borrado exitoso de Captura")
        }).
        catch(error=>console.log(error));
        
      }

      InitializeSeqCaptura(){
        let sql = '  UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME="captura" ';
        console.log("sql " +sql);
        this.db.executeSql(sql, []).then(()=>{
          console.log("Inicializacion de Seq Captura");
        }).
        catch(error=>console.log(error)); 
      }

      deleteTableDatosFijos(){
        let sql = 'DELETE FROM datosFijos;';
        console.log("sql " +sql);
        this.db.executeSql(sql, []).then(()=>{
          console.log("Borrado exitoso de datosFijos")
        }).
        catch(error=>console.log(error));
        
      }

      InitializeSeqDatosFijos(){
        let sql =  ' UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME= "datosFijos"';
        console.log("sql " +sql);
        this.db.executeSql(sql, []).then(()=>{
          console.log("Inicializacion de Seq datosFijos");
        }).
        catch(error=>console.log(error));
        
      }

      selectChange(){
        let sql = ' select changes();' ;    
        return this.db.executeSql(sql, []);
      }

      createIndexIdCap(){
        let sql = 'CREATE UNIQUE INDEX IF NOT EXISTS idx_id_captura '+
              'ON captura (id_captura)';
        this.db.executeSql(sql, []).then(()=>{
          console.log("Se creo el indice idx_id_captura ");
        }).catch(error=>console.log(error));
      }
    
      createIndexIdCapDatoFijo(){
        let sql = 'CREATE UNIQUE INDEX IF NOT EXISTS idx_id_captura_dato_fijo '+
              'ON captura (id_captura, id_dato_fijo)';
          return this.db.executeSql(sql, []).then(()=>{
            console.log("Se creo el indice idx_id_captura_dato_fijo ");
          }).catch(error=>console.log(error));
      }

      createIndexNumInv(){
        let sql = 'CREATE UNIQUE INDEX IF NOT EXISTS idx_num_inv '+
              'ON captura (id_captura,num_inv)';
          return this.db.executeSql(sql, []).then(()=>{
            console.log("Se creo el indice idx_num_inv ");
          }).catch(error=>console.log(error));
      }
      createIndexNumSap(){
        let sql = 'CREATE UNIQUE INDEX IF NOT EXISTS idx_num_sap '+
              'ON captura (id_captura,num_sap)';
          return this.db.executeSql(sql, []).then(()=>{
            console.log("Se creo el indice idx_num_sap ");
          }).catch(error=>console.log(error));
      }

      createIndexSerie(){
        let sql = 'CREATE UNIQUE INDEX IF NOT EXISTS idx_serie '+
              'ON captura (id_captura,serie)';
          return this.db.executeSql(sql, []).then(()=>{
            console.log("Se creo el indice idx_serie ");
          }).catch(error=>console.log(error));
      }
      
      createIndexIdDatoFijo(){
        let sql = 'CREATE UNIQUE INDEX IF NOT EXISTS idx_id_datos_fijos '+
              'ON datosFijos (id_datos_fijos)';
          return this.db.executeSql(sql, []).then(()=>{
            console.log("Se creo el indice idx_id_datos_fijos ");
          }).catch(error=>console.log(error));
      }

      createIndexStatus(){
        let sql = 'CREATE UNIQUE INDEX IF NOT EXISTS idx_status '+
              'ON captura (id_captura, estatus)';
          return this.db.executeSql(sql, []).then(()=>{
            console.log("Se creo el indice idx_status ");
          }).catch(error=>console.log(error));
      }


      createTable(){
        let sql = 'CREATE TABLE IF NOT EXISTS datosFijos('+
            ' id_datos_fijos INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            ' id_employee INTEGER, nombre TEXT, '+
            ' centro_costos INTEGER, area TEXT, ' +
            ' cod_inmueble INTEGER, piso INTEGER, usuario TEXT,'+
            ' fecha TEXT )';
        this.db.executeSql(sql, []).then(()=>{
          console.log("Se creo la tabla datosFijos");
        }).catch(error=>console.log(error));
      }
      
      create(datos_fijos: any){
      
        let sql = 'INSERT INTO datosFijos(id_employee, nombre, centro_costos, area, cod_inmueble, piso, usuario, fecha) VALUES(?,?,?,?,?,?,?,?)';
       return this.db.executeSql(sql, [datos_fijos.idEmpleado, datos_fijos.nombre, datos_fijos.centroCostos, datos_fijos.area,
                                        datos_fijos.codInmueble, datos_fijos.piso, datos_fijos.usuario, datos_fijos.fecha]).
                                        then(response =>{
                                          var Resp = "registro guardado en datosFijos";
                                          return Promise.resolve(Resp);
                                        })
                                        .catch(error => Promise.reject(error));
      }

      deleteIdDatosFijos(dato:any){
        console.log("Objeto " +JSON.stringify(dato));
        let sql = 'DELETE FROM datosFijos where id_datos_fijos=?';
         this.db.executeSql(sql, [Number(dato.id_datos_fijos)]).
         then(()=>{
          console.log("Se borraron los datos");
          }).
          catch(error=>console.log("error"+ error));
      }

      getAll(){
        let sql = 'SELECT *  FROM datosFijos where nombre <> "generico" order by id_datos_fijos asc';
        return  this.db.executeSql(sql, [])
        .then(response => {
          var DatoF: any[] = [];
          if(response.rows.length>0){
            for (let index = 0; index < response.rows.length; index++) {
              DatoF.push( response.rows.item(index));
            }
          }
          return Promise.resolve( DatoF );
        })
        .catch(error => Promise.reject(error));
      }

      getIdDatosFijos(cc : any){
        console.log("cc " + JSON.stringify(cc));
        let sql = 'Select id_datos_fijos FROM datosFijos where centro_costos = ?';
        return this.db.executeSql(sql,[cc]).
          then(response =>{
            var dato: any[] = [];
           console.log(JSON.stringify(response));
            if(response!== null){
              cc = response; 
            }
            return Promise.resolve(dato);
          }).catch(error => Promise.reject(error));
             
      }

      getIdEmploye(idEmpleado){
       console.log("Empleado" + idEmpleado );
        let sql = 'Select * FROM datosFijos where id_employee = ?';
        return this.db.executeSql(sql,[idEmpleado])
          .then(response =>{
            var dato: any[] = [];
            if(response.rows.length>0){
              for (let index = 0; index < response.rows.length; index++) {
                  dato.push( response.rows.item(index));
                } 
              }else if(response.rows.length === 0 ){
            dato = [];
            }
            return Promise.resolve(dato);
          })
		  .catch(error => Promise.reject(error));   
      }
     /*2021*/
      getAllDf(){
        let sql = 'SELECT *  FROM datosFijos';
        return  this.db.executeSql(sql, [])
        .then(response => {
          var DatoF: any[] = [];
          if(response.rows.length>0){
            for (let index = 0; index < response.rows.length; index++) {
              DatoF.push( response.rows.item(index));
            }
          }
          return Promise.resolve( DatoF );
        })
        .catch(error => Promise.reject(error));
      }

      getCC(idDatofijo : any){
        console.log("idDatoFijo " + JSON.stringify(idDatofijo));
        let sql = 'Select centro_costos FROM datosFijos where id_datos_fijos = ?';
        return this.db.executeSql(sql,[Number(idDatofijo)]).
          then(response =>{
            var dato: any[] = [];
            if(response.rows.length>0){
              for (let index = 0; index < response.rows.length; index++) {
                if (response.rows.item(index)!=null){
                  dato.push( response.rows.item(index));
                  console.log("1 "+ response.rows.item(index));
                }        
              }
            }
            return Promise.resolve(dato);
          }).catch(error => Promise.reject(error));
             
      }

      getIdDatoFijo (){
        let idDatosFijos: any [];
        let sql = 'Select  *FROM datosFijos where id_employee <> ""';
        return  this.db.executeSql(sql, [])
        .then(response => {
          var DatoF: any[] = [];
          if(response.rows.length>0){
            for (let index = 0; index < response.rows.length; index++) {
              DatoF.push( response.rows.item(index));
              console.log("1"+ response.rows.item(index).id_datos_fijos
              );
            }
          }
          return Promise.resolve( DatoF );
        })
        .catch(error => Promise.reject(error));
      }

      //num_inv = codido_1, num_sap = codigo_2, edo_fisico = condicion_fisica, largo = frente, fondo = ancho
      createTableCaptura(){
        let sql = 'CREATE TABLE IF NOT EXISTS captura('+
            ' id_captura INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            ' id_dato_fijo INTEGER, num_inv TEXT, '+ 
            ' num_sap TEXT, empresa TEXT,  descripcion TEXT, edo_fisico TEXT, '+ 
            ' desc_corta TEXT, marca TEXT, modelo TEXT, serie TEXT,' +
            ' color TEXT, dimensiones TEXT, centro_costos TEXT, expediente TEXT,' +
            ' ubicacion TEXT, area TEXT, alto TEXT, largo TEXT,'+ 
            ' ancho TEXT, piso TEXT, comentarios TEXT, fecha TEXT,'+
            ' estatus TEXT, campo_add1 TEXT, campo_add2 TEXT, '+
            ' foreign key(id_dato_fijo) references datosFijos(id_datos_fijos))';
            console.log('sql captura ' +sql);
        this.db.executeSql(sql, []).then(()=>{
          console.log("Se creo la tabla Captura");
        }).catch(error => Promise.reject(error));
      }

      insertCaptura (concentrado: any){
        console.log("entro al insert captura estatus " + concentrado.estatus);
        let sql = 'INSERT INTO captura(id_dato_fijo, num_inv, empresa, num_sap, descripcion, edo_fisico, '+
                 'desc_corta, marca, modelo, serie, color, largo, alto, ancho, ubicacion, comentarios, estatus, centro_costos )'+
                 ' VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        return this.db.executeSql(sql, [concentrado.idDatofijo, concentrado.numInv, concentrado.empresa, 
          concentrado.noSap, concentrado.descripcion, concentrado.edoFisico, concentrado.descCorta, concentrado.marca,
           concentrado.modelo, concentrado.serie, concentrado.color, concentrado.largo, concentrado.alto, concentrado.ancho, 
           concentrado.ubicacion, concentrado.comentarios, concentrado.estatus, concentrado.centroCostos]).then(response =>{
            var Resp = "datos guardados";
            return Promise.resolve(Resp);
          })
          .catch(error => Promise.reject(error));
      }

      insertCapturaLayout(concentrado: any){
        let sql = 'INSERT INTO captura (empresa, num_inv, num_sap, descripcion, marca, modelo, serie, color,  largo, ancho, alto,'+
           ' edo_fisico, ubicacion, comentarios, estatus,id_dato_fijo, fecha) '+
            ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
             return this.db.executeSql(sql,[concentrado[0],concentrado[1], concentrado[2], concentrado[3], concentrado[4],concentrado[5], 
              concentrado[6], concentrado[7], concentrado[8],concentrado[9], concentrado[10], concentrado[11], concentrado[12],concentrado[13], 
              concentrado[14], Number(concentrado[15]), concentrado[16]]).then(()=>{
                //console.log("datos insertados Layout");
              }).
            catch(error=>console.log(error));
      }

      insertCapturaLayout2(concentrado: any){
        let sql = 'INSERT INTO captura (empresa, num_inv, num_sap, descripcion, marca, modelo, serie, color,  largo, ancho, alto, edo_fisico, '+
                  ' ubicacion, comentarios, estatus,id_dato_fijo, fecha) '+
            ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
             return this.db.executeSql(sql,[concentrado[0],concentrado[1], concentrado[2], concentrado[3], concentrado[4],concentrado[5], 
              concentrado[6], concentrado[7], concentrado[8],concentrado[9], concentrado[10], concentrado[11], concentrado[12],concentrado[13], 
              concentrado[14], Number(concentrado[15]), concentrado[16]]).then(response=>{
                console.log('datos insertados Layout' + JSON.stringify(response));
                return (response);
              }).
            catch(error=>console.log(error));
      }

      updateCaptura(datosCaptura:any){
        console.log("datos Captura: "  + JSON.stringify(datosCaptura));
        let sql = 'UPDATE captura SET id_dato_fijo = ?, num_inv =?, num_sap =?, empresa =?, descripcion = ?, ubicacion=?,'+
                  'edo_fisico=?, desc_corta =?,  marca =?, modelo =?, serie =?, color=?, largo =?, alto =?, ancho =?, comentarios =?,' +
                  'estatus =? where id_captura =?';
          return this.db.executeSql(sql,[ datosCaptura.idDatofijo, datosCaptura.numInv, datosCaptura.noSap, datosCaptura.empresa, 
          datosCaptura.descripcion, datosCaptura.ubicacion, datosCaptura.edoFisico, datosCaptura.descCorta, datosCaptura.marca,
                datosCaptura.modelo, datosCaptura.serie, datosCaptura.color, datosCaptura.largo, datosCaptura.alto, datosCaptura.ancho, 
                datosCaptura.comentarios, datosCaptura.estatus, Number(datosCaptura.idCaptura)]).then(response =>{
                  var Resp = "registro actualizado";
                  return Promise.resolve(Resp);
                })
                .catch(error => Promise.reject(error));
      }

      updateStatus(datosCap: any){
        console.log("estatus " +JSON.stringify(datosCap.estatus));
        console.log("id " + JSON.stringify(datosCap.idCaptura));
        let sql = 'UPDATE captura SET estatus = ? where id_captura = ?'
        this.db.executeSql(sql, [datosCap.estatus, Number(datosCap.idCaptura)]).
        then(()=>{
          console.log("datos actualizados Captura");
        }).catch(error=>console.log(error));
      }


      getAllCaptura(){
        let sql = 'SELECT * FROM captura order by id_captura asc';
        return  this.db.executeSql(sql, [])
        .then(response => {
          var datosCaptura: any[] = [];
          if(response.rows.length>0){
            for (let index = 0; index < response.rows.length; index++) {
              datosCaptura.push( response.rows.item(index));
            }
          }
          console.log('datosCapturaR' +JSON.stringify(datosCaptura));
          return Promise.resolve( datosCaptura );
        })
        .catch(error => Promise.reject(error));
      }

      getAllCapturaLayout(){
        let sql = 'SELECT df.id_employee as ID_EMPLEADO, df.nombre as NOMBRE, df.centro_costos as CENTRO_COSTOS, df.area as AREA, '+
                  ' df.cod_inmueble as CODIGO_INMUEBLE, df.piso as PISO, df.usuario as USUARIO, date() as FECHA, '+
                  ' c.id_captura as ID_CAPTURA, c.empresa as EMPRESA, c.num_inv as CODIGO_1, c.num_sap as CODIGO_2,'+
                  ' c.descripcion as DESCRIPCION, c.marca as MARCA, c.modelo as MODELO,'+
                  ' c.serie as SERIE, c.color as COLOR, c.largo as FRENTE, c.ancho as FONDO, c.alto as ALTO, '+
                  ' c.edo_fisico as CONDICION_FISICA, c.ubicacion as UBICACION, c.comentarios as COMENTARIOS, c.estatus as ESTATUS'+
                  ' FROM captura c '+
                  ' inner join datosFijos df ' +
                  ' on c.id_dato_fijo = df.id_datos_fijos ' +
                  ' order by id_captura asc ';
        return  this.db.executeSql(sql, [])
        .then(response => {
          var datosCaptura: any[] = [];
          if(response.rows.length>0){
            for (let index = 0; index < response.rows.length; index++) {
              datosCaptura.push( response.rows.item(index));
            }
          }
          console.log('datosCapturaR' +JSON.stringify(datosCaptura));
          return Promise.resolve( datosCaptura );
        })
        .catch(error => Promise.reject(error));
      }


    
      getCapturaByNumInv(numInv){
        let sql = 'select * from captura where num_inv = ?';
        return this.db.executeSql(sql, [numInv])
        .then(response => {
          var captura: any[] = [];    
          if(response.rows.length > 0 ){
            for (let index = 0; index < response.rows.length; index++) {
              captura.push( response.rows.item(index) );
            }
          }else  if(response.rows.length === 0 ){
            // captura.push( response.rows );
            captura = [];
          }
          return Promise.resolve( captura );
        })
        .catch(error => Promise.reject(error));
      }

      getCapturaByNumSap(numInv){
        let sql = 'select * from captura where num_sap = ?';
        return this.db.executeSql(sql, [numInv])
        .then(response => {
          var captura: any[] = [];   
          if(response.rows.length > 0 ){
            for (let index = 0; index < response.rows.length; index++) {
              captura.push( response.rows.item(index) );
            }
          }else  if(response.rows.length === 0 ){
            // captura.push( response.rows );
            captura = [];
          }
          return Promise.resolve( captura );
        })
        .catch(error => Promise.reject(error));
      }

      getCapturaBySerie(numInv){
        let sql = 'select * from captura where serie = ?';
        return this.db.executeSql(sql, [numInv])
        .then(response => {
          var captura: any[] = [];   
          if(response.rows.length > 0 ){
            for (let index = 0; index < response.rows.length; index++) {
              captura.push( response.rows.item(index) );
            }
          }else  if(response.rows.length === 0 ){
            // captura.push( response.rows );
            captura = [];
          }
          return Promise.resolve( captura );
        })
        .catch(error => Promise.reject(error));
      }

      getStatus(){
        var estatus: any[] = [];    
        console.log("Entro a recuperar estatus ");
        let sql = 'select estatus, count(*) as cantidad from captura group by estatus';      
        return this.db.executeSql(sql, [])
        .then((resultSet) => {
          console.log("resultado " +JSON.stringify(resultSet));
          
          if(resultSet.rows.length > 0 ){
            for (let index = 0; index < resultSet.rows.length; index++) {
              estatus.push( resultSet.rows.item(index) );
            }
          }else  if(resultSet.rows.length === 0 ){
            // captura.push( response.rows );
            estatus = [];
          }
          console.log('estatus ' +JSON.stringify(estatus));
          return Promise.resolve( estatus )
        })
        .catch(error => Promise.reject(error));
      }
      getHeaderCaptura(){
        const captura = 'captura';
        let sql = 'SELECT name FROM PRAGMA table_info(' + captura + ')';
        return  this.db.executeSql(sql, [])
        .then(response => {
          var headerCaptura: any[] = [];
          if(response.rows.length>0){
            for (let index = 0; index < response.rows.length; index++) {
              headerCaptura.push( response.rows.item(index));
            }
          }
          return Promise.resolve( headerCaptura );
        })
        .catch(error => Promise.reject(error));

      }


}

