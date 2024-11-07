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
      {files.length > 0 && (
        <p className="text-sm text-gray-600 mb-3">
          ⚠️ PDFs will be merged in this order:
        </p>
      )}
      <div className="file-list space-y-3">
        {files.map((file, index) => (
          <div key={index} className="p-3 border rounded bg-white shadow">
            <p className="text-gray-700 font-medium mb-2">{file.name}</p>
            <div className="flex sm:space-x-2 sm:flex-row flex-col">
              <button
                onClick={() => onMoveFile(index, -1)}
                disabled={index === 0}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 w-full sm:w-auto mb-2 sm:mb-0"
              >
                Move Up
              </button>
              <button
                onClick={() => onMoveFile(index, 1)}
                disabled={index === files.length - 1}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 w-full sm:w-auto"
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
