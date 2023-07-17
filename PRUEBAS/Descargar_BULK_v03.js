const Airtable = require('airtable');
const fetch = require('cross-fetch');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const axios = require('axios');


const base = new Airtable({ apiKey: 'patAp928STVLsSe6b.48edd04475224f87909aa0acf28b49405e1fd210d4f9ef6c08bb5e0616904f50' }).base('apppEJj2zTr5RSOjP');
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
    const folderPath = path.resolve(__dirname, 'attachments');
  
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  
    const records = await base(tableName).select({
      fields: [attachmentFieldName],
      view: viewName,
    }).all();
  
    console.log(`Total records: ${records.length}`);
  
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const attachments = record.get(attachmentFieldName);
  
      // Assume there is always only one attachment in the field and it's a PDF
      if (attachments && attachments.length > 0 && attachments[0].type === 'pdf') {
        const attachmentUrl = attachments[0].url;
        const fileName = `${nameFILE}_${i}.pdf`; // Rename the file as per your requirements
        const filePath = path.join(folderPath, fileName);
  
        const response = await fetch(attachmentUrl, {
          headers: {
            Authorization: `Bearer YOUR_PERSONAL_ACCESS_TOKEN`,
          },
        });
  
        const fileStream = fs.createWriteStream(filePath);
        response.body.pipe(fileStream);
  
        await new Promise((resolve, reject) => {
          fileStream.on('finish', resolve);
          fileStream.on('error', reject);
        });
  
        console.log(`Downloaded attachment ${i + 1}/${records.length}`);
      }
    }
  
    console.log('All attachments downloaded successfully.');
    rl.close();
  }
  
  downloadAttachments().catch(console.error);