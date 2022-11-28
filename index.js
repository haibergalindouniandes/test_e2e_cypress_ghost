const fs = require('fs');
const fetch = require('node-fetch');

const fixturesDir = `./cypress/fixtures/`;
const encodingFile = 'utf8';
const fileDataAccountsName = `Accounts.json`;
const fileDataPostsName = `Posts.json`;
const fileDataPagesName = `Pages.json`;
const urlApiMockarooAccounts = 'https://my.api.mockaroo.com/pas/random/init/data/member.json';
const headerMockarooAccounts = { 'Content-Type': 'application/jsonn', 'X-API-Key': 'ef45f480' };
const urlApiMockarooPost = 'https://my.api.mockaroo.com/post.json';
const headerMockarooPost = {
    'Content-Type': 'application/jsonn',
    'X-API-Key': 'c96766b0',
};

async function generateDataPoolFiles() {

    console.log('------------------------------------------------------------------------------------')
    console.log('Ejecución iniciada ...')

    console.log('Creación del DataPool Accounts.json ...')
    var responseAccounts = await fetch(urlApiMockarooAccounts,{
        headers: headerMockarooAccounts
    })

    var dataResponseAccounts = await responseAccounts.json();
    fs.writeFileSync(`${fixturesDir}${fileDataAccountsName}`, JSON.stringify(dataResponseAccounts), encodingFile);
    console.log('Creación del DataPool Accounts.json Exitoso...')
    
    console.log('Creación del DataPool Post.json ...')
    var responsePost = await fetch(urlApiMockarooPost,{
        headers: headerMockarooPost
    })

    var dataResponsePost = await responsePost.json();
    fs.writeFileSync(`${fixturesDir}${fileDataPostsName}`, JSON.stringify(dataResponsePost), encodingFile);
    console.log('Creación del DataPool Post.json Exitoso...')

    console.log(`Ejecución finalizada. Por favor verfique el los data pools generados en la carpeta ${fixturesDir}`)
    console.log('------------------------------------------------------------------------------------')
}

(async () => await generateDataPoolFiles())();