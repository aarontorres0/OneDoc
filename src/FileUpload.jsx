import React, { useEffect, useRef } from 'react';

function FileUpload({ files, onFilesSelected, onMoveFile }) {
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
    <div className="file-upload-container w-full max-w-md mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="file-input mb-4 w-full px-4 py-2 border rounded"
      />
      <div className="file-list space-y-3">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded bg-white shadow">
            <p className="text-gray-700 font-medium">{file.name}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => onMoveFile(index, -1)}
                disabled={index === 0}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Move Up
              </button>
              <button
                onClick={() => onMoveFile(index, 1)}
                disabled={index === files.length - 1}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
              >
                Move Down
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
