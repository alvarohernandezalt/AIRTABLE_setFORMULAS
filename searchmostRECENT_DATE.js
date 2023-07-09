let inputData = input.config();
let fecha1 = inputData.fecha1; // Fecha en formato string
let fecha2 = inputData.fecha2; // Fecha en formato string
let fecha3 = inputData.fecha3; // Fecha en formato string

// Convertir las fechas a objetos Date si tienen valor
let fechas = [];
for (let fecha of [fecha1, fecha2, fecha3]) {
  if (fecha) {
    fechas.push(new Date(fecha));
  }
}

// Encontrar la fecha más reciente
let fechaMasReciente = null;
let nombreColumna = null;

for (let i = 0; i < fechas.length; i++) {
  let fecha = fechas[i];
  if (!fechaMasReciente || fecha > fechaMasReciente) {
    fechaMasReciente = fecha;
    nombreColumna = `fecha${i + 1}`;
  }
}

// Si se encontró una fecha válida, establecer el nombre de la columna como salida
if (nombreColumna) {
  output.set('Comentario_mas_Reciente', nombreColumna);
}
