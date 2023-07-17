// Change this name to use a different table
let table = base.getTable('YOUR_TABLE');
// Prompt the user to pick a record
// If this script is run from a button field, this will use the button's record instead.
let record = await input.recordAsync('Select a record to use', table);
let Dato1 = record.getCellValue('NB-Dato1 - DATE') || '';
let Dato2 = record.getCellValue('NB-Dato2krant - DATE') || '';
let Pagina = record.getCellValue('NB-Pagina DATE') || '';

let dates = [
  { field: 'NB-Dato1', value: Dato1 },
  { field: 'NB-Dato2', value: Dato2 },
  { field: 'NB-Pagina', value: Pagina },
];

//filter out empty dates (remove if you would prefer empty dates to remain)
dates = dates.filter((f) => f.value);

//sort array of field value objects
dates.sort((a, b) => String(a.value).localeCompare(String(b.value)));

for (let d of dates) {
  output.markdown(`**${d.field}** ${d.value}`);
}