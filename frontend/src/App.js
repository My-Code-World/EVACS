import React, { useState } from 'react';
import axios from 'axios';

export default function Upload() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('http://localhost:3001/upload', formData);
        setResponse(res.data);
    };

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
}
