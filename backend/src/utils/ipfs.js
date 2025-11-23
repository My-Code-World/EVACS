const { Web3Storage } = require('web3.storage');

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY });

async function uploadToIPFS(file) {
    const cid = await client.put([file]);
    return cid;
}

module.exports = { uploadToIPFS };
