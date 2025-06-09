

import { pdfjs } from 'react-pdf';

// Configure PDF.js worker for Vite environment
export const configurePdfWorker = () => {
  // Use a CDN worker URL that matches the installed pdfjs version
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  
  console.log('PDF.js configured with worker:', pdfjs.GlobalWorkerOptions.workerSrc);
};

