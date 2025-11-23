const express = require('express');
const multer = require('multer');
const { uploadToIPFS } = require('../utils/ipfs');
const { ethers } = require('ethers');
const DocumentVerificationABI = require('../contract/DocumentVerification.json');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const cid = await uploadToIPFS(file);

        // Connect to Sepolia
        const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, DocumentVerificationABI.abi, wallet);

        const fileHash = ethers.hashMessage(cid); // hash CID
        const tx = await contract.storeDocument(fileHash);
        await tx.wait();

        res.json({ success: true, cid, txHash: tx.hash });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
