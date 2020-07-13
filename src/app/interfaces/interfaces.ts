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