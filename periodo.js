// ==========================================
// 📅 PERÍODO (define qué es "un mes" en toda la app)
// ==========================================
// Por defecto, un "mes" es el mes calendario (del 1 al último día), como
// siempre. Si la persona activa un ciclo de cobro personalizado en Mi Perfil
// (por ejemplo, día 23), un "mes" pasa a ser ese ciclo: del día 23 de un mes
// al día 22 del siguiente, ambos inclusive — y ESE rango es el que se
// etiqueta con el nombre del mes en que arranca (ej: "Julio" = 23 jul al 22
// ago). Este es el ÚNICO lugar de la app que sabe esta regla — todo lo demás
// (Flujo Mensual, Cuentas por Cobrar, Inversiones, el gráfico) le pregunta
// acá en vez de calcularlo cada uno por su cuenta, así nunca quedan
// desincronizados entre sí.
//
// El día de cobro se limita a 1-28 a propósito: así el ciclo tiene sentido
// en CUALQUIER mes (incluido febrero), sin casos raros de fechas que no
// existen en algunos meses.
import { estadoApp } from './estado.js';

function obtenerDiaCobro() {
    return estadoApp.perfilUsuario.diaCobro || 0;
}

// Devuelve el rango [inicio, fin] (objetos Date, ambos días incluidos) del
// período (aSel, mSel).
export function obtenerRangoPeriodo(aSel, mSel) {
    let dia = obtenerDiaCobro();
    if (!dia) {
        return { inicio: new Date(aSel, mSel, 1), fin: new Date(aSel, mSel + 1, 0) };
    }
    return { inicio: new Date(aSel, mSel, dia), fin: new Date(aSel, mSel + 1, dia - 1) };
}

// Dada una fecha como texto ("YYYY-MM-DD"), devuelve la clave "YYYY-MM" del
// período al que pertenece. Con ciclo personalizado, un día ANTERIOR al día
// de cobro todavía pertenece al período que arrancó el mes anterior.
export function obtenerKeyPeriodoDeFecha(fechaStr) {
    let dia = obtenerDiaCobro();
    let f = new Date(fechaStr + 'T00:00:00');
    if (!dia) {
        return `${f.getFullYear()}-${(f.getMonth() + 1).toString().padStart(2, '0')}`;
    }
    let a = f.getFullYear(), m = f.getMonth();
    if (f.getDate() < dia) {
        m -= 1;
        if (m < 0) { m = 11; a -= 1; }
    }
    return `${a}-${(m + 1).toString().padStart(2, '0')}`;
}

// Lo mismo que obtenerKeyPeriodoDeFecha(), pero para un objeto Date directo
// (útil para "hoy").
export function obtenerKeyPeriodoDeDate(fecha) {
    let fechaStr = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
    return obtenerKeyPeriodoDeFecha(fechaStr);
}
