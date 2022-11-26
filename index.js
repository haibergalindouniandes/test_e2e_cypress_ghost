const fs = require('fs');
const fetch = require('node-fetch');

const fixturesDir = `./cypress/fixtures/`;
const encodingFile = 'utf8';
const fileDataAccountsName = `Accounts.json`;
const fileDataPostsName = `Posts.json`;
const fileDataPagesName = `Pages.json`;
const urlApiMockaroo = 'https://my.api.mockaroo.com/pas/random/data/member.json';
const headerMockaroo = {
    'Content-Type': 'application/jsonn',
    'X-API-Key': 'ef45f480',
};

async function generateDataPoolFiles() {

    console.log('------------------------------------------------------------------------------------')
    console.log('Ejecución iniciada ...')
    var response = await fetch(urlApiMockaroo, {
        headers: headerMockaroo
    })

    var dataResponse = await response.json();
    fs.writeFileSync(`${fixturesDir}${fileDataAccountsName}`, JSON.stringify(dataResponse), encodingFile);


    // const json2csvParser = new Parser();
    // const csv = json2csvParser.parse(dataResponse);
    // fs.writeFileSync(`${fixturesDir}Account.csv`, csv);
    console.log(`Ejecución finalizada. Por favor verfique el los data pools generados en la carpeta ${fixturesDir}`)
    console.log('------------------------------------------------------------------------------------')
}

(async () => await generateDataPoolFiles())();