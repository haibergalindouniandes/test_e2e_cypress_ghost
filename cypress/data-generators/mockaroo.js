const fetch = require('node-fetch');

class Mockaroo {
    getData = async (url, apiKey) => {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/jsonn',
                'X-API-Key': apiKey,
            }
        });
        const data = await response.json();
        return data;
    };

}
module.exports = { Mockaroo }