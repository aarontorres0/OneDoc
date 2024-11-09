import { PDFDocument } from 'pdf-lib';
import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';

function App() {
  const [files, setFiles] = useState([]);
  const [pdfName, setPdfName] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleFilesSelected = (selectedFiles) => {
    setFiles(selectedFiles);
    setWarningMessage('');
  };

  const handleNameChange = (event) => {
    setPdfName(event.target.value);
    setWarningMessage('');
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const [file] = newFiles.splice(index, 1);
    newFiles.splice(index + direction, 0, file);
    setFiles(newFiles);
  };

  const mergePDFs = async () => {
    if (files.length === 0 || !pdfName) {
      setWarningMessage('Please select PDF files and enter a file name to merge.');
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (let file of files) {
      const fileData = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileData);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfData = await mergedPdf.save();
    downloadPDF(mergedPdfData);

    setFiles([]);
    setPdfName('');
  };

  const clearFiles = () => {
    setFiles([]);
    setPdfName('');
    setWarningMessage('');
  };

  const downloadPDF = (pdfData) => {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pdfName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} sm:mx-0 mx-2`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>

      <h1 className="text-5xl font-bold mb-4">OneDoc</h1>
      <FileUpload files={files} onFilesSelected={handleFilesSelected} onMoveFile={moveFile} />

      <input
        type="text"
        value={pdfName}
        onChange={handleNameChange}
        placeholder="Enter PDF name"
        className="mt-4 px-4 py-2 border rounded w-full max-w-md"
      />

      {warningMessage && (
        <p className="text-sm text-red-600 mt-4 text-center">
          {warningMessage}
        </p>
      )}

      <div className="mt-4 flex space-x-2">
        <button
          onClick={mergePDFs}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Merge PDFs
        </button>
        <button
          onClick={clearFiles}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
