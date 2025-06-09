
import { pdfjs } from 'react-pdf';

// Configure PDF.js to use CDN worker
export const configurePdfWorker = () => {
  // Use the PDF.js worker from CDN
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  
  console.log('PDF.js configured with CDN worker:', pdfjs.GlobalWorkerOptions.workerSrc);
};
