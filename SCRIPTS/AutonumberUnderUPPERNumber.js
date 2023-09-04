/*
In this script we put an autonumber for each entry, under idMatriz number.
The script search the last number linked to idMatriz and add next consecutive number.
It needs from input.config() two values:
recorID = beacuse this script is running inside an Airtable automation
idMatriz = First level number to search secondary numbers and add new 
consecutive number.
It outputs idTOTAL.
*/


let inputConfig = input.config();
let idMatriz = String(inputConfig.idMatriz);

let table = base.getTable('PRESUPUESTOS');
let queryResult = await table.selectRecordsAsync();

let count = 0;
for (let record of queryResult.records) {
  let fieldValue = record.getCellValueAsString('idMatriz');
  if (String(fieldValue) === idMatriz) {
    count++;
  }
}

output.set('idTOTAL', { count });
