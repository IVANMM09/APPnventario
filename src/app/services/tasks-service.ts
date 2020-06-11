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

}