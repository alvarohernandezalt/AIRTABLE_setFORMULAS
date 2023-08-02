/* In this script we get 10 diferent attachment fields and check if they are empty or not.
If they are empty we get an output.set() method from Airtable.
If the attachemnt is empty we get: ✅ OK
If the attachment is not empty: 🟥 NO
So then, inside the airtable automation, we get values to update the status fields
*/

// This is an Airtable script running inside an automation
let inputConfig = input.config();

// Function to check if the attachment field is empty or not
function isAttachmentEmpty(attachmentField) {
  return !attachmentField || attachmentField.length === 0;
}

// Function to get the status based on the attachment field
function getStatus(attachmentField) {
  return isAttachmentEmpty(attachmentField) ? "✅ OK" : "🟥 NO" ;
}

// Check and set the status for each field
const fieldsToCheck = ["ESP_I", "ESP_W", "ENG_I", "ENG_W", "FRA_I", "FRA_W", "POR_I", "POR_W", "EUSK_I", "EUSK_W"];
for (const field of fieldsToCheck) {
  let isFieldEmpty = isAttachmentEmpty(inputConfig[field]);
  console.log(`${field} attachment is ${isFieldEmpty ? "empty" : "not empty"}`);
  let fieldStatus = getStatus(inputConfig[field]);
  output.set(`${field}_status`, fieldStatus);
}

