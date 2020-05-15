import { Concentrado } from '../interfaces/interfaces';
import { stringify } from 'querystring';
import { isString } from 'util';

export class Scan{
    public text:   string;
    public noSAP:  string;
    public numInv: string;
    public descripcion: string;
    public ubicacionInt: string;
    public descCorta: string;
    public marca: string;
    public modelo: string;
    public serie: string;
    public color: string;
    public alto: string;
    public ancho: string;
    public largo: string;
    
    constructor( objConcen: Concentrado | string){
        
        if (isString(objConcen)){
            this.text   =  objConcen;
            this.noSAP  =  objConcen;
            this.numInv =  '';
            this.descripcion = '';
            this.ubicacionInt = '';
            this.descCorta = '';
            this.marca  = '';
            this.modelo = '';
            this.serie  = '';
            this.color  = '';
            this.alto   = '';
            this.ancho  = '';
            this.largo  = '';
        }else{
            this.text   = objConcen.CODIGO_2;
            this.noSAP  = objConcen.CODIGO_2;
            this.numInv = objConcen.CODIGO_1;
            this.descripcion = objConcen.DESCRIPCION;
            this.ubicacionInt = objConcen.UBICACION;
            this.descCorta = objConcen.DESCRIPCION_CORTA;
            this.marca  = objConcen.MARCA;
            this.modelo = objConcen.MODELO;
            this.serie  = objConcen.NUMERO_SERIE;
            this.color  = objConcen.COLOR;
            this.alto   = objConcen.ALTO;
            this.ancho  = objConcen.FONDO;
            this.largo  = objConcen.FRENTE;  
        }

    }

}