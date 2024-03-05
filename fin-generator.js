import { v4 as uuidv4 } from 'uuid';
import randomstring from 'randomstring';
import dateFormat from "dateformat";
import fs from 'fs';

const fromJpm = false
const toBusinessAccount = false
const sanctionCheck = false
const fraudCheck = false
const failMessage = false
const closedAccount = false
const closedCassOut = false

const outputFolder = "/Users/steve.jones/code/finmessagegen/generated"

const jpmBic="CHASUS33XXX"
const natwestBic="NWBKGB2LXXX"
const starlingBic="SRLGGB2LXXX"
const transactionReference="sj/" + randomstring.generate({length: 12});
const transactionDate= dateFormat(new Date(), "yymmdd")
const uetr= uuidv4()
const currency= fromJpm ? "USD" : "GBP" 
const amount= "1000"
const largeAmount = "1000000"
const invalidBeneficaryAccount="GB92SRLG04004299943123"
const myDemoPersonalAcouunt="GB96SRLG04004272583973"
const myXCodeSimulatorPersonalAccount="GB75SRLG04004210186773"
const domesticChapsPersonalAccount="60837110186773"
const myDemoBusinessAccount="GB10SRLG04004232168725"
const aClosedPersonalAccount="GB33SRLG04004289207997"
const aClosedCASSPersonalAccount="GB13SRLG04004218720979"
const beneficaryAccount = getBeneficiary()
const beneficaryName="Steve"
const senderAccount=":60837105163870"
const senderName="Dumbledore"
const sanctionedSenderName = "NapierAutoOpen"
const senderCountry="UAE"
const remittenceInfo="TestMessageGenerator"

function getBeneficiary() {
  if (toBusinessAccount) {
    return myDemoBusinessAccount;
  }
  if (closedAccount) {
    if (closedCassOut) {
      return aClosedCASSPersonalAccount
    }
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
const folderName = `${outputFolder}/${dateFormat(new Date(), "dddd-dd")}`
const filePath = folderName + "/" + fileName;
const finMessage = `{1:F01${starlingBic}0000000000}{2:O1030000230831${fromJpm ? jpmBic : natwestBic}76351234562308310000N}{3:{121:${uetr}}}{4:
:20:${transactionReference}
:23B:CRED
:32A:${transactionDate}${currency}${fraudCheck ? largeAmount : amount}
:33B:${currency}${fraudCheck ? largeAmount : amount}
:50K:/${senderAccount}
${sanctionCheck ? sanctionedSenderName : senderName}
SOMEWHERE /${senderCountry}
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