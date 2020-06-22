import { SQLiteObject } from '@ionic-native/sqlite/ngx';

export class ActivosInfoService {
    db: SQLiteObject = null;
  
    constructor() {
      
     }
     
     setDatabase(db: SQLiteObject){
      if(this.db === null){
        this.db = db;
      }
    }

createTableCaptura(){
    let sql = 'CREATE TABLE IF NOT EXISTS captura('+
        ' id_captura INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        ' id_dato_fijo INTEGER, num_inv TEXT, '+
        ' num_sap TEXT, descripcion TEXT, ' +
        ' ubicacion_int TEXT, ubicacion_ant TEXT, edo_fisico TEXT,'+
        ' desc_corta TEXT, marca TEXT, modelo TEXT, serie TEXT, ' +
        ' color TEXT, dimensiones TEXT )';
        console.log("sql " +sql);
    return this.db.executeSql(sql, []);
  }

  insertCaptura (concentrado: any){
      
    let sql = 'INSERT INTO captura(id_dato_fijo, num_inv, num_sap, ubicacion_int, ubicacion_ant, edo_fisico, '+
             'desc_corta, marca, modelo, serie, color, dimensiones ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [concentrado.idDatoFijo, concentrado.numInv, concentrado.noSap, concentrado.ubicacionInt,
                                    concentrado.ubicacionAnt, concentrado.edoFisico, concentrado.descCorta, concentrado.marca,
                                    concentrado.modelo, concentrado.serie, concentrado.color, concentrado.dimensiones]).
        catch(error=>console.log(error));
  }

  getCapturaByNumInv(numInv: any){
    let sql = 'select * from captura where num_inv =?';
    return this.db.executeSql(sql, [numInv])
    .then(response => {
      let captura = [];
      for (let index = 0; index < response.rows.length; index++) {
        captura.push( response.rows.item(index) );
      }
      return Promise.resolve( captura );
    })
    .catch(error => Promise.reject(error));
  }

}