import { v4 as uuidv4 } from 'uuid';
import randomstring from 'randomstring';
import dateFormat from "dateformat";
import fs from 'node:fs/promises'; 

const receiverBic="SRLGGB2L"
const senderBic="NWBKGB2L"
const transactionReference="sj/" + randomstring.generate({length: 12});
const transactionDate= dateFormat(new Date(), "yymmdd")
const uetr= uuidv4()
const currency="GBP"
const amount="10,99"
const beneficaryAccount="GB92SRLG04004207743328"
const beneficaryName="Steve J"
const senderAccount=":60837105163870"
const senderName="Dumbledore"
const senderCountry="GB"
const remittenceInfo="generated from fin-generator.js"

const finMessage = `{1:F01${senderBic}XXX0000000000}{2:O1030000230831${receiverBic}XXX76351234562308310000N}{3:{121:${uetr}}}{4:
:20:${transactionReference}
:23B:CRED
:32A:${transactionDate}${currency}${amount}
:33B:${currency}${amount}
:50K:/${senderAccount}
${senderName}
LONDON ENGLAND /${senderCountry}
N1 7FQ
:52A:${senderBic}
:59:/${beneficaryAccount}
${beneficaryName}
:70:${remittenceInfo}
:71A:SHA
-}
`

const fileName = `fingen-${dateFormat(new Date(), "yymmdd-hhmmss")}.fin`
const saveLocation = `/Users/steve.jones/code/finmessagegen/${fileName}`
fs.writeFile(saveLocation, finMessage, err => {
  if (err) {
    console.error(err);
  }
});
console.log(`Saved ${fileName} in ${saveLocation}`)