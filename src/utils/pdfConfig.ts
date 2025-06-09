
import { pdfjs } from 'react-pdf';

// Configure PDF.js to work without web workers (more reliable)
export const configurePdfWorker = () => {
  // Disable worker by setting workerSrc to false
  pdfjs.GlobalWorkerOptions.workerSrc = false;
  
  console.log('PDF.js configured without worker (main thread mode)');
};
