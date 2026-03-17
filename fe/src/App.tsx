import { useEffect, useState } from "react";
import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

import axios from "axios";

export function App() {
  const BASE_URL = "http://localhost:3001";
  const [file, setFile] = useState<File | null>();

  const uploadThigyy = async () => {
    if (!file) return;

    const res = await axios.get(`${BASE_URL}/get-presigned-url`);
    
    const { putUrl, path } = res.data;
    
    /**
     * Access to XMLHttpRequest at 'https://test.38d51e3fbe318c5a9501ab750c094f7e.r2.cloudflarestorage.com/random-folder/0.9287382193982436.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=096af92527b64947cfad42920dee22ee%2F20260317%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260317T150450Z&X-Amz-Expires=3600&X-Amz-Signature=9943305f510404708f50ab2e211d9ac86b7a35efa7a65aa1de6772ce485264d9&X-Amz-SignedHeaders=host&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32&x-id=PutObject' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.
     */

    // getting these above erros will look into them tommow
    
    const options = {
        method: 'PUT',
        url: putUrl,
        headers: { 'Content-Type': file.type },
        data: file
    };

    await axios.request(options);

    // await axios.post(`${BASE_URL}/upload-final-url`, {
    //   path
    // });

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
