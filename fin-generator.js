import { v4 as uuidv4 } from 'uuid';
import randomstring from 'randomstring';
import dateFormat from "dateformat";
import fs from 'fs';

const failMessage = true
const fromJpm = false
const toBusinessAccount = false
const closedAccount = true

const jpmBic="CHASUS33XXX"
const natwestBic="NWBKGB2LXXX"
const starlingBic="SRLGGB2LXXX"
const transactionReference="sj/" + randomstring.generate({length: 12});
const transactionDate= dateFormat(new Date(), "yymmdd")
const uetr= uuidv4()
const currency= fromJpm ? "USD" : "EUR" 
const amount="101,99"
const invalidBeneficaryAccount="GB92SRLG04004299943123"
const myDemoPersonalAcouunt="GB96SRLG04004272583973"
const myDemoBusinessAccount="GB10SRLG04004232168725"
const aClosedPersonalAccount="GB33SRLG04004289207997"
const beneficaryAccount = getBeneficiary()
const beneficaryName="Steve"
const senderAccount=":60837105163870"
const senderName="Dumbledore"
const senderCountry="GB"
const remittenceInfo="TestMessageGenerator"

function getBeneficiary() {
  if (toBusinessAccount) {
    return myDemoBusinessAccount;
  }
  if (failMessage && closedAccount) {
    return aClosedPersonalAccount;
  }
  if (failMessage) {
    return invalidBeneficaryAccount;
  }
  return myDemoPersonalAcouunt;
}

function createDirectoryIfNotExists(folderName) {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
}

function writeFileToDirectory(filePath, finMessage) {
  fs.writeFileSync(filePath, finMessage, err => {
    if (err) {
      console.log("Problem saving file: " + err);
    }
  });
  console.log(`Saved file at: ${filePath}`)
}


const fileName = `fingen-${dateFormat(new Date(), "yymmdd-HHMMss")}.fin`
const folderName = `/Users/steve.jones/code/finmessagegen/generated/${dateFormat(new Date(), "dddd-dd")}`
const filePath = folderName + "/" + fileName;
const finMessage = `{1:F01${starlingBic}0000000000}{2:O1030000230831${fromJpm ? jpmBic : natwestBic}76351234562308310000N}{3:{121:${uetr}}}{4:
:20:${transactionReference}
:23B:CRED
:32A:${transactionDate}${currency}${amount}
:33B:${currency}${amount}
:50K:/${senderAccount}
${senderName}
LONDON /${senderCountry}
N1 7FQ
:52A:${jpmBic}
:59:/${beneficaryAccount}
${beneficaryName}
:70:${remittenceInfo}
:71A:SHA
-}
`;

createDirectoryIfNotExists(folderName);
writeFileToDirectory(filePath, finMessage);