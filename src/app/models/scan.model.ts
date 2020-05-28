import { Concentrado } from '../interfaces/interfaces';

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
    
    constructor( objConcen: Concentrado ){

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