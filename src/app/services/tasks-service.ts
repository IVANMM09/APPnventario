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

      createTableCaptura(){
        let sql = 'CREATE TABLE IF NOT EXISTS captura('+
            ' id_captura INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            ' id_dato_fijo INTEGER, num_inv TEXT, '+
            ' num_sap TEXT, descripcion TEXT, ' +
            ' ubicacion_int TEXT, ubicacion_ant TEXT, edo_fisico TEXT,'+
            ' desc_corta TEXT, marca TEXT, modelo TEXT, serie TEXT, ' +
            ' color TEXT, dimensiones TEXT )';
            console.log("sql captura " +sql);
        return this.db.executeSql(sql, []);
      }
    
      insertCaptura (concentrado: any){
        console.log("entro al insert captura ");
        let sql = 'INSERT INTO captura(id_dato_fijo, num_inv, num_sap, ubicacion_int, ubicacion_ant, edo_fisico, '+
                 'desc_corta, marca, modelo, serie, color, dimensiones ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        return this.db.executeSql(sql, [concentrado.idDatoFijo, concentrado.numInv, concentrado.noSap, concentrado.ubicacionInt,
                                        concentrado.ubicacionAnt, concentrado.edoFisico, concentrado.descCorta, concentrado.marca,
                                        concentrado.modelo, concentrado.serie, concentrado.color, concentrado.dimensiones]).
            catch(error=>console.log(error));
      }
    
      getCapturaByNumInv(numInv: any){
        let sql = 'select * from captura where num_inv = ?';
        return this.db.executeSql(sql, [numInv])
        .then(response => {
          let captura = [];
          if(response.row.length>1 ){
            for (let index = 0; index < response.rows.length; index++) {
              captura.push( response.rows.item(index) );
              console.log("Captura " + captura.length )
            }
          }else  if(response.row.length==1 ){
            captura.push( response.rows.item(0));
          }
          return Promise.resolve( captura );
        })
        .catch(error => Promise.reject(error));
      }
    


}