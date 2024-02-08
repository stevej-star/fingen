import { v4 as uuidv4 } from 'uuid';
import randomstring from 'randomstring';
import dateFormat from "dateformat";
import fs from 'node:fs/promises'; 

const failMessage = true
const fromJpm = false

const jpmBic="CHASUS33"
const natwestBic="NWBKGB2L"
const starlingBic="SRLGGB2L"
const transactionReference="sj/" + randomstring.generate({length: 12});
const transactionDate= dateFormat(new Date(), "yymmdd")
const uetr= uuidv4()
const currency="USD"
const amount="10,99"
const invalidBeneficaryAccount="GB92SRLG04004299943123"
const validbeneficaryAccount="GB49SRLG04004254127174"
const beneficaryName="No Account"
const senderAccount=":60837105163870"
const senderName="Dumbledore"
const senderCountry="GB"
const remittenceInfo="generated"

const finMessage = `{1:F01${starlingBic}XXX0000000000}{2:O1030000230831${fromJpm ? jpmBic : natwestBic}XXX76351234562308310000N}{3:{121:${uetr}}}{4:
:20:${transactionReference}
:23B:CRED
:32A:${transactionDate}${currency}${amount}
:33B:${currency}${amount}
:50K:/${senderAccount}
${senderName}
LONDON ENGLAND /${senderCountry}
N1 7FQ
:52A:${jpmBic}
:59:/${failMessage ? invalidBeneficaryAccount : validbeneficaryAccount}
${beneficaryName}
:70:${remittenceInfo}
:71A:SHA
-}
`

const fileName = `fingen-${dateFormat(new Date(), "yymmdd-HHMM")}.fin`
const saveLocation = `/Users/steve.jones/code/finmessagegen/generated/${fileName}`
fs.writeFile(saveLocation, finMessage, err => {
  if (err) {
    console.error(err);
  }
});
console.log(`Saved ${fileName} in ${saveLocation}`)