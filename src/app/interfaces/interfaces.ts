export interface Componente{
    icon: string;
    name: string;
    redirectTo: string;
    }

export interface DatoF {
    idEmpleado: string;
        nombre: string;
        centroCostos: string;
        area: string;
        codInmueble: string;
        piso: string;
        usuario: string;
        fecha: string;
      }


export interface DatoCaptura {
        idCaptura: string;
            idDatoFijo: string;
            empresa: string;
            numInv: string;
            numSap: string;
            descripcion: string;
            ubicacionInt: string;
            ubicacionAnt: string;
            estadoF: string;
            descCorta: string;
            marca: string;
            modelo: string;
            serie: string;
            encontrado: string;
            color: string;
            dimensiones: string;
            centroCosto: string;
            expediente: string;
            ubicacionPeople: string;
            area: string;
            alto: string;
            largo: string;
            ancho: string;
            piso: string;
            observaciones: string;
            estatus: string;
            campoAdd1: string;
            campoAdd2: string;
          }

export interface Concentrado{
    CODIGO_1: string;
    NUMERO_SERIE: string;
    MODELO: string;
    MARCA: string;
    DESCRIPCION: string;
    COLOR: string;
    ALTO: string;
    FONDO: string;
    FRENTE: string;
    CODIGO_2: string;
    UBICACION: string;
    DESCRIPCION_CORTA: string;
}

export interface Data{
    name:string;
    value:string;
}

export interface Conteo{
    faltante : string,
    encontrado: string,
    nuevo: string
  }