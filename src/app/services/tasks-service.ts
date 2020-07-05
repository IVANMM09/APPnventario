import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatoF } from '../interfaces/interfaces';

export class TasksService {
    db: SQLiteObject = null;
    activos: DatoF[] = [];
  
    constructor() {
      
     }


    setDatabase(db: SQLiteObject){
        if(this.db === null){
          this.db = db;
        }
      }

      createTable(){
        let sql = 'CREATE TABLE IF NOT EXISTS datosFijos('+
            ' id_datos_fijos INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            ' id_employee INTEGER, name TEXT, '+
            ' centro_costos INTEGER, area TEXT, ' +
            ' cod_inmueble INTEGER, piso INTEGER, usuario TEXT,'+
            ' fecha TEXT )';
            console.log("sql " +sql);
        return this.db.executeSql(sql, []);
      }

      createTableLayout(){
        let sql = 'CREATE TABLE IF NOT EXISTS layout('+
            ' id_layout INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            ' empresa TEXT, codigo1 TEXT, codigo2 TEXT, ' +
            ' serie TEXT, modelo TEXT, marca TEXT,'+
            ' descripcion TEXT )';
            console.log("sql " +sql);
        return this.db.executeSql(sql, []);
      }
      
      create(datos_fijos: any){
      
        let sql = 'INSERT INTO datosFijos(id_employee, name, centro_costos, area, cod_inmueble, piso, usuario, fecha) VALUES(?,?,?,?,?,?,?,?)';
        return this.db.executeSql(sql, [datos_fijos.idEmpleado, datos_fijos.nombre, datos_fijos.centroCostos, datos_fijos.area,
                                        datos_fijos.codInmueble, datos_fijos.piso, datos_fijos.usuario, datos_fijos.fecha]).
            catch(error=>console.log(error));
      }

      deleteIdDatosFijos(dato:any){
        console.log("Objeto " +JSON.stringify(dato));
        let sql = 'DELETE FROM datosFijos where id_datos_fijos=?';
        return this.db.executeSql(sql, [Number(dato.id_datos_fijos)]).
          catch(error=>console.log("error"+ error));
      }

      insertLayout (layout:any ){
        let sql = 'INSERT INTO layout( empresa, codigo1, codigo2, serie, modelo, marca, descripcion) VALUES(?,?,?,?,?,?,?)';
        console.log("create " + sql);
        return this.db.executeSql(sql, [layout.empresa, layout.codigo1, layout.codigo2,
                                        layout.serie, layout.modelo, layout.marca, layout.descripcion]).
            catch(error=>console.log(error));
      }

      getAll(){
        let sql = 'SELECT * FROM datosFijos';
        return  this.db.executeSql(sql, [])
        .then(response => {
          let DatoF = [];
          if(response.rows.length>0){
            for (let index = 0; index < response.rows.length; index++) {
              DatoF.push( response.rows.item(index));
            }
          }
          return Promise.resolve( DatoF );
        })
        .catch(error => Promise.reject(error));
      }

      getCC(cc : any){
        var dato: any;
        let sql = 'Select id_datos_fijos FROM datosFijos where centro_costos = ?';
        return this.db.executeSql(sql,[cc]).
          then(response =>{
           console.log(JSON.stringify(response));
            if(response!== null){
              dato = response; 
            }
            return Promise.resolve(dato);
          }).catch(error => Promise.reject(error));
          
          
      }


      createTableCaptura(){
        let sql = 'CREATE TABLE IF NOT EXISTS captura('+
            ' id_captura INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            ' id_dato_fijo INTEGER, num_inv TEXT, '+
            ' num_sap TEXT, descripcion TEXT, ' +
            ' ubicacion_int TEXT, ubicacion_ant TEXT, edo_fisico TEXT, '+
            ' desc_corta TEXT, marca TEXT, modelo TEXT, serie TEXT, encontrados TEXT, ' +
            ' color TEXT, dimensiones TEXT, centro_costos TEXT, expediente TEXT,' +
            ' ubicacion_people TEXT, area TEXT, alto TEXT, largo TEXT,'+
            ' ancho TEXT, largo TEXT, piso TEXT, observaciones TEXT, '+
            ' estatus TEXT, campo_add1 TEXT, campo_add2 TEXT)';
            console.log("sql captura " +sql);
        return this.db.executeSql(sql, []);
      }
    
      insertCaptura (concentrado: any){
        console.log("entro al insert captura ");
        let sql = 'INSERT INTO captura(id_dato_fijo, num_inv, num_sap, descripcion, ubicacion_int, ubicacion_ant, edo_fisico, '+
                 'desc_corta, marca, modelo, serie, color, dimensiones ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
        return this.db.executeSql(sql, [concentrado.idDatofijo, concentrado.numInv, concentrado.noSap, concentrado.descripcion,
           concentrado.ubicacionInt, concentrado.ubicacionAnt, concentrado.edoFisico, concentrado.descCorta, concentrado.marca,
           concentrado.modelo, concentrado.serie, concentrado.color, concentrado.dimensiones]).
            catch(error=>console.log(error));
      }

      insertCapturaLayout(concentrado: any){
        console.log(" Guardado "+JSON.stringify(concentrado[3]));
        let sql = 'INSERT INTO captura (encontrados, num_sap, centro_costos, expediente, ubicacion_people, area, num_inv,serie, marca, modelo, '+ 
            ' color, descripcion, alto, ancho, largo, piso, observaciones, edo_fisico, ubicacion_int, ubicacion_ant,estatus) '+
            ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            return this.db.executeSql(sql,[concentrado[0],concentrado[1], concentrado[2], concentrado[3], concentrado[4],concentrado[5], 
              concentrado[6], concentrado[7], concentrado[8],concentrado[9], concentrado[10], concentrado[11], concentrado[12],concentrado[13], 
              concentrado[14], concentrado[15], concentrado[16],concentrado[17], concentrado[18], concentrado[19], concentrado[20],
              concentrado[21]]).
            catch(error=>console.log(error));
      }

      updateCaptura(datosCaptura:any){
        console.log("datos Captura: "  + JSON.stringify(datosCaptura));
        let sql = 'UPDATE prueba SET id_dato_fijo = ?, num_inv =?, num_sap =?, descripcion = ?, ubicacion_int=?,'+
                  'ubicacion_ant=?, edo_fisico=?, desc_corta =?,  marca =?, modelo =?, serie =?, color=?, dimensiones =? '+
                  ' where id_captura =?';
        return this.db.executeSql(sql,[ datosCaptura.idDatofijo, datosCaptura.numInv, datosCaptura.noSap, datosCaptura.descripcion,
                datosCaptura.ubicacionInt, datosCaptura.ubicacionAnt, datosCaptura.edoFisico, datosCaptura.descCorta, datosCaptura.marca,
                datosCaptura.modelo, datosCaptura.serie, datosCaptura.color, datosCaptura.dimensiones, datosCaptura.idCaptura]).
                catch(error=>console.log(error)
                );
      }

      getAllCaptura(){
        let sql = 'SELECT * FROM captura';
        return  this.db.executeSql(sql, [])
        .then(response => {
          let datosCaptura = [];
          if(response.rows.length>0){
            for (let index = 0; index < response.rows.length; index++) {
              datosCaptura.push( response.rows.item(index));
            }
          }
          return Promise.resolve( datosCaptura );
        })
        .catch(error => Promise.reject(error));
      }
    
      getCapturaByNumInv(numInv){
        let sql = 'select * from captura where num_inv = ?';
        return this.db.executeSql(sql, [numInv])
        .then(response => {
          let captura = [];    
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
    


}