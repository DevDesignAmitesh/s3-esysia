import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export function App() {
  const [file, setFile] = useState<File | null>();

  const uploadThigyy = async () => {
    if (!file) return;

    const res = await axios.get(`${BASE_URL}/get-presigned-url`);
    
    const { putUrl, path } = res.data;
    
    const options = {
        method: 'PUT',
        url: putUrl,
        headers: { 'Content-Type': file.type },
        data: file
    };

    await axios.request(options);

    await axios.post(`${BASE_URL}/upload-final-url`, {
      path
    });

    console.log(path, putUrl);
  };


  useEffect(() => {
    uploadThigyy()
  }, [file])

  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <input
        type="file"
        accept="video/mp4"
        onChange={(e) => setFile(e.target.files && e.target.files[0])}
      />
    </div>
  );
}

export default App;
