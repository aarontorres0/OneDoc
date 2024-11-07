import { PDFDocument } from 'pdf-lib';
import React, { useState } from 'react';
import FileUpload from './FileUpload';

function App() {
  const [files, setFiles] = useState([]);

  const handleFilesSelected = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const mergePDFs = async () => {
    const mergedPdf = await PDFDocument.create();

    for (let file of files) {
      const fileData = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileData);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfData = await mergedPdf.save();
    downloadPDF(mergedPdfData);
  };

  const downloadPDF = (pdfData) => {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'merged_document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">OneDoc</h1>
      <FileUpload onFilesSelected={handleFilesSelected} />
      <button
        onClick={mergePDFs}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={files.length === 0}
      >
        Merge PDFs
      </button>
    </div>
  );
}

export default App;
