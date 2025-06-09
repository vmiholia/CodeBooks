
import { pdfjs } from 'react-pdf';

// Configure PDF.js worker using bundled worker
export const configurePdfWorker = () => {
  // Use the worker from node_modules that gets bundled by Vite
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString();
  
  console.log('PDF.js worker configured:', pdfjs.GlobalWorkerOptions.workerSrc);
};
