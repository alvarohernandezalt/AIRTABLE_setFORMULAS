const Airtable = require('airtable');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const AdmZip = require('adm-zip');

const base = new Airtable({ apiKey: 'personaltoken' }).base('baseid');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function askQuestion(prompt) {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }
  
  async function downloadAttachments() {
    const tableName = await askQuestion('Enter the table name: ');
    const viewName = await askQuestion('Enter the view name: ');
    const attachmentFieldName = await askQuestion('Enter the attachment field name: ');
    const nameFILE = await askQuestion('Enter a file name: ');
    const folderPath = path.resolve(__dirname);
  
    const records = await base(tableName).select({
      fields: [attachmentFieldName],
      view: viewName,
    }).all();
  
    const zip = new AdmZip();

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const attachments = record.get(attachmentFieldName);

    // Assume there is always only one attachment in the field and it's a PDF
    if (attachments && attachments.length > 0 && attachments[0].type === 'pdf') {
      const attachmentUrl = attachments[0].url;
      const fileName = `${nameFILE}_${i}.pdf`; // Rename the file as per your requirements

      const response = await axios.get(attachmentUrl, {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer YOUR_PERSONAL_ACCESS_TOKEN`,
        },
      });
      const fileData = response.data;

      zip.addFile(fileName, fileData);

      console.log(`Downloaded attachment ${i + 1}/${records.length}`);
    }
  }

  const zipFilePath = path.join(__dirname, 'attachments.zip');
  zip.writeZip(zipFilePath);

  console.log(`All attachments downloaded and saved to ${zipFilePath}`);
  rl.close();
}

downloadAttachments().catch(console.error);