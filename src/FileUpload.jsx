import React, { useState } from 'react';

function FileUpload({ onFilesSelected }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    onFilesSelected(selectedFiles);
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="file-input"
      />
      <div className="file-list">
        {files.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
