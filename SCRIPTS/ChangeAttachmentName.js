/*
This code is for running inside an AIRTABLE automation.
The automation can be started with any trigger
It needs two inputs from input.config():
recordID
newName (the field that gives the new name to the attachment)
You also need to change TABLENAME with your Table name and,
ATTACHMENTFIELD with the name of the attachment's field its name
is going to be changed
*/

// Setup
let config = input.config()
let table = base.getTable("TABLENAME")

// Define the variable newName and assign it the value Adjusted name
let newName = config.newName
console.log(config.newName)

// Creates the vector to store the infos of the submitted record
const record = await table.selectRecordAsync(config.recordID)
console.log(record)

// @ts-ignore > Ignores the error due to the possibility of the record being null, as the automation trigger conditions guarantee that it won't be.
// Stores the attachment(s) information in the attachmentField array
let attachmentField = record.getCellValue("ATTACHMENTFIELD")

// Creates a new empty vector that will receive the renamed document(s) to overwrite the existing ones with the original 
let newAttachment =[]

// Will execute the for for the number of attachments inside the attachmentField vector
for (let [attachmentNumber, attachment] of attachmentField.entries()){
    console.log(attachmentNumber,attachment,)

    // Breaks the original attachment name string into an array where the extension is separated into an address of that array
    let findExtension = attachment.filename.match(/\.\w+$/) || [""]
    let extension = findExtension[0]
    console.log(extension)

    // If the number of attachments is greater than 1, then it will rename the attachments and add a sequential incrementer to the end
    let fileSpecifcName = attachmentNumber>0 ? "_" + (attachmentNumber+1) : ""

    // Feeds the newAttachment vector with the url and name of the attachment with the adjustments made
    newAttachment.push({
        url:attachment.url,
        filename: newName + fileSpecifcName + extension
        })
}
console.log("New attachment field array", newAttachment)

// @ts-ignore > Ignores the error due to the possibility of the record being null, because the automation trigger conditions guarantee that it won't be
// Updates the Document field with the modified attachment(s)
await table.updateRecordAsync(record.id,
{
    ATTACHMENTFIELD: newAttachment
})