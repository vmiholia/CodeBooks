

import { pdfjs } from 'react-pdf';

// Configure PDF.js worker using jsDelivr CDN
export const configurePdfWorker = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  
  console.log('PDF.js worker configured:', pdfjs.GlobalWorkerOptions.workerSrc);
};

