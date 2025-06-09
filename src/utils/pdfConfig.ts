
import { pdfjs } from 'react-pdf';

// Configure PDF.js to work without web workers (legacy mode)
export const configurePdfWorker = () => {
  // Disable worker to avoid loading issues in bundled environments
  pdfjs.GlobalWorkerOptions.workerSrc = '';
  pdfjs.disableWorker = true;
  
  console.log('PDF.js configured in legacy mode (no worker)');
};
