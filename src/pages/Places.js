import React, { useState } from 'react';

function Places() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <div>
        {files.map((file, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(file)} alt={`Image ${index}`} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Places;