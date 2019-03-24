

//Constantes

/** Poder de la gasolina 1 */
const n1=1.3;
/** Poder de la gasolina 2 */
const n2=1.3;
/**Coeficiente calorífico de los gases */
const k=1.4;
/**Constante universal de los gases */
const r = 0.287;
/** Poder calorífico total del combustible */
const lvh = 44000;
/** Relación combustible-aire en vehículos de inyección */
const rca = 14.7;
/** Relación volumen-calor en vehícyulos de inyección */
const cv = 0.713;

/**
 * Temperatura de combustión
 * @param {number} e Relación de compresión
 * @param {number} Ta Temperatura de admisión en grados centígrados
 * @return {number} Temperatura de combustión en grados kelvin
 */
function temperatura_compresión(e, Ta) {
    return Math.pow(e,k-1)*(Ta+273);
}

/**
 * Densidad de aire en el cilindro
 * @param {number} Pa - Presión de admisión en Kpa
 * @param {number} Ta Temperatura de admisión en grados centígrados
 * @return {number} Densidad de aire en el cilindro en Kg/cm3
 */
function densidad_aire(Pa, Ta) {
    return Pa / (r*(Ta+273));
}

/**
 * Masa de aire teórica
 * @param {number} da - Densidad de aire
 * @param {number} VH - Cilindrada
 * @param {number} i - Número de Cilindros
 * @return {number} Masa de aire teórica en Kg
 */
function masa_aire_t(da,VH,i){
    return da * ((VH/i)*0.001);
}

/**
 * Masa de aire real
 * @param {number} mat - Masa de aire teórica
 * @param {number} n - Revoluciones en Potencia Máxima
 * @param {number} i - Número de Cilindros
 * @param {number} tao - Número de ciclos del motor
 * @return {number} Masa de aire real en Kg/s
 */
function masa_aire_r(mat, n, i, tao) {
    return (mat*n*i)/(tao*60);
}

/**
 * Masa de combustible
 * @param {number} mar - Masa de aire real
 * @return {number} Masa de combustible en Kg/s
 */
function masa_combustible(mar){
    return mar/rca;
}

/**
 * Calor específico de combustión
 * @param {number} mf - Masa de combustible
 * @return {number} Calor específico de combustible en KJ/Kg*°K
 */
function calor_especifico(mf) {
    return mf*lvh;
}

/**
 * Temperatura de combustión
 * @param {number} qf - Calor específico de combustión
 * @param {number} mar - Masa de  aire real
 * @param {number} tc - Temperatura de compresión
 * @return {number} Temperatura de combustón en °K
 */
function temperatura_combustion(qf,mar,tc) {
    return (qf  / (mar*cv)) + tc;
}

/**
 * Presión de combustión
 * @param {number} tz - Temperatura de combustión
 * @param {number} pc - Presión de compresión
 * @param {number} tc - Temperatura de compresión
 * @return {number} Presión de combustión en Kpa
 */
function presion_combustion(tz,pc,tc){
    return pc*(tz/tc);
}

/**
 * Presión del escape
 * @param {number} pz - Presión de combustión
 * @param {number} e - Relación de compresión
 * @return {number} presión del escape en Kpa
 */
function presion_escape(pz,e){
    return pz/Math.pow(e, k)
}

/**
 * Temperatura del escape
 * @param {number} tz - Temperatura de combstión
 * @param {number} e - Relación de compresión
 * @return {number} Temperatura del escape en °K
 */
function temperatura_escape(tz,e) {
    return tz/Math.pow(e,k-1);
}

/**
 * Diferencial de Presión Indicado
 * @param {number} pz - Presión de Combustión
 * @param {number} pc - Presión de Combustión
 * @return {number} Diferencial de Presión Indicado
 */
function diferencial_presion_i(pz,pc) {
    return pz/pc;
}

/**
 * Diferencial de Presión del Escape
 * @param {number} pz - Presión de Combustión
 * @param {number} pb - Presión del escape
 */
function diferencial_presion_e(pz, pb){
    return pz/pb;
}

/**
 * Presión Media Indicada
 * @param {number} pa - Presión de Admisión
 * @param {number} lambda_i  - Diferencial de Presión Indicado
 * @param {number} e - Relación de Compresión
 * @return {number} Presión Media Indicada en Kpa
 */
function presion_media_indicada(pa, lambda_i, e) {
    return pa * 
        (Math.pow(e,n1)/(e-1)) * 
        ( 
            lambda_i/(n2-1) * (1/Math.pow(e,n2-1)) - 
            (1/(n1-1))* (1/Math.pow(e,n2-1)) 
        );
}
/**
 * Potencia Indicada
 * @param {number} pmi - Presion Media Indicada
 * @param {number} VH - Cilindrada
 * @param {number} n - Revoluciones en Potencia Máxima
 * @return {number} Potencia Indicada en CV
 */
function potencia_indicada(pmi, VH, n){
    return ((pmi/88.966)*VH*n)/900;

}

/**
 * Potencia Efectiva
 * @param {number} pme - Potencia Media Efectiva
 * @param {number} VH - Cilindrada
 * @param {number} n - Revoliciones en Potencia Máxima
 * @return {number} Potencia Efectiva en CV
 */
function potencia_efectiva(pme,VH,n) {
    return ((pme/98.066)*VH*n)/900;
}

/**
 * Rendimiento Térmico
 * @param {number} e - Relación de Compresión
 * @return {number} Rendimiento Térmico 
 */
function rendimiento_termico(e) {
    return 1 - (1 / Math.pow(e,k-1));
}

/**
 * Presión Media Efectiva
 * @param {number} pa - Presión en Admisión
 * @param {number} e - Relación de Compresión
 * @param {number} lambda_e - Diferencial de Presión Efectiva
 * @param {number} nt - Rendimiento Térmico
 * @return {number} Presión Media Efectiva en Kpa
 */
function presion_media_e(pa,e,lambda_e,nt) {
    return pa * ( Math.pow(e,k-1)/(e-1) * (lambda_e-1)/(k-1)) * nt;
}

/**
 * Potencia absorvida
 * @param {number} pi - Potencia Indicada
 * @param {number} pe - Potencia Efectiva
 */
function potencia_absorvida(pi,pe){
    return pi-pe;
}

function realizar_calculos(datos) {
    var vars = {};
    for (idx in datos) {
        if (datos[idx].value==null || isNaN(datos[idx].value)) {
            return null;
        } else {
            vars[idx] = datos[idx].value;
        }
    }
    vars["tc"] = temperatura_compresión(vars.e, vars.Ta);
    vars["da"] = densidad_aire(vars.pa, vars.Ta);
    vars["mat"] = masa_aire_t(vars.da, vars.VH, vars.i);
    vars["mar"] = masa_aire_r(vars.mat, vars.n, vars.i, vars.tao);
    vars["mf"] = masa_combustible(vars.mar);
    vars["qf"] = calor_especifico(vars.mf);
    vars["tz"] = temperatura_combustion(vars.qf, vars.mar, vars.tc);
    vars["pz"] = presion_combustion(vars.tz, vars.pc, vars.tc);
    vars["tb"] = temperatura_escape(vars.tz, vars.e);
    vars["pb"] = presion_escape(vars.pz, vars.e);
    vars["lambda_i"] = diferencial_presion_i(vars.pz, vars.pc);
    vars["lambda_e"] = diferencial_presion_e(vars.pz, vars.pb);
    vars["pmi"] = presion_media_indicada(vars.pa, vars.lambda_i, vars.e);
    vars["pi"] = potencia_indicada(vars.pmi, vars.VH, vars.n);
    vars["nt"] = rendimiento_termico(vars.e);
    vars["pme"] = presion_media_e(vars.pa, vars.e, vars.lambda_e, vars.nt);
    vars["pe"] = potencia_efectiva(vars.pme, vars.VH, vars.n);
    vars["pab"] = potencia_absorvida(vars.pi, vars.pe);

    return vars;

}



function curva_admision(e,pa) {
    const paso = e*0.1;
    var result=[];
    for (var x=1; x<=e; x=x+paso) {
        result.push( [x], [Math.pow(x,k)*pa]);
    }
    return result;
}

function curva_expansion(e, pz){
    const paso = e*0.1;
    var result=[];
    for(var x=1; x<=e; x=x+paso){
        result.push([x], [ Math.pow(x,k)/pz]);
    }
    return result;
}

