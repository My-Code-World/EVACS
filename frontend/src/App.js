import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadResp, setUploadResp] = useState(null);
  const [verifyResp, setVerifyResp] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadResp(res.data);
      alert('Upload successful!');
    } catch (err) {
      console.error(err);
      alert('Upload failed! Check console.');
    }
  };

  const handleVerify = async () => {
    if (!uploadResp?.cid) return alert("Upload a file first");
    try {
      const res = await axios.get(`http://localhost:3001/verify/${uploadResp.cid}`);
      setVerifyResp(res.data);
    } catch (err) {
      console.error(err);
      alert('Verification failed! Check console.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>EVACS Upload & Verify</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>

      {uploadResp && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Upload CID:</strong> {uploadResp.cid}</p>
          <p><strong>Transaction:</strong> {uploadResp.txHash}</p>
          <button onClick={handleVerify}>Verify on Blockchain</button>
        </div>
      )}

      {verifyResp && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Exists:</strong> {verifyResp.exists.toString()}</p>
          {verifyResp.exists && (
            <>
              <p><strong>Uploader:</strong> {verifyResp.uploader}</p>
              <p><strong>Timestamp:</strong> {new Date(verifyResp.timestamp * 1000).toLocaleString()}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
