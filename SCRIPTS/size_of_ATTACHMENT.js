// Remember to change the name of the table and fields to the ones on your Airtable Base
const table = base.getTable('INFORMES EMPRESARIALES');
const fieldWithAttachments = 'Archivo';
const fieldToStoreSizes = 'Tamano';


// Retrieve the specific record based on the provided recordId
const recordId = input.config().recordId;
const record = await table.selectRecordsAsync({ recordIds: [recordId] });
const selectedRecord = record.records[0];

const attachments = selectedRecord.getCellValue(fieldWithAttachments);

if (attachments) {
  // Iterate over each attachment in the field
  const sizes = attachments.map((attachment) => attachment.size || 0);
  const sum = sizes.reduce((acc, curr) => acc + curr, 0);

  // Update the sizes field with the calculated sum
  await table.updateRecordAsync(selectedRecord, {
    [fieldToStoreSizes]: sum,
  });
}

