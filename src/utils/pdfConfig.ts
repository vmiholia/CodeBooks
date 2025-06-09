
import { pdfjs } from 'react-pdf';

// Configure PDF.js worker for Vite using CDN
export const configurePdfWorker = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  
  console.log('PDF.js worker configured:', pdfjs.GlobalWorkerOptions.workerSrc);
};
