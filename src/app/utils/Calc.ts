export class Calc {
    static redondearDecimales (numero, decimales = 2) : number {
        //Respuesta de Enrique B.
        var numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');
        if (numeroRegexp.test(numero)) {
            return Number(numero.toFixed(decimales));
        } else {
            return Number(numero.toFixed(decimales)) === 0 ? 0 : numero;
        }
    }
    
}
