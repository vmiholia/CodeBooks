
import { pdfjs } from 'react-pdf';

// Configure PDF.js worker for Vite
export const configurePdfWorker = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();
  
  console.log('PDF.js worker configured for Vite:', pdfjs.GlobalWorkerOptions.workerSrc);
};
