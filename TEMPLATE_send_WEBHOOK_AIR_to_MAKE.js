const inputData = input.config()
const { recordID } = inputData;
const response = await fetch("https://myspecificwebhookURL"+"?recordId="+recordID)
console.log(response.status)