const express = require('express');
const { ethers } = require('ethers');
const DocumentVerificationABI = require('../contract/DocumentVerification.json');

const router = express.Router();

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        // Connect to Local Hardhat
        const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, DocumentVerificationABI.abi, wallet);

        // Hash the CID
        const fileHash = ethers.hashMessage(cid);

        const result = await contract.verifyDocument(fileHash);

        // result = [exists, uploader, timestamp(BigInt)]
        const exists = result[0];
        const uploader = result[1];
        const timestamp = Number(result[2]); // fix BigInt → number

        return res.json({
            exists,
            uploader,
            timestamp
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
