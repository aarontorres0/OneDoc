import React, { useEffect, useRef } from 'react';

function FileUpload({ files, onFilesSelected }) {
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (files.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [files]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    onFilesSelected(selectedFiles);
  };

  return (
    <div className="file-upload-container">
      <input
        ref={fileInputRef}
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
