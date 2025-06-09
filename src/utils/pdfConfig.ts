

import { pdfjs } from 'react-pdf';

// Configure PDF.js to work without web workers (legacy mode)
export const configurePdfWorker = () => {
  // Disable worker by setting workerSrc to false
  pdfjs.GlobalWorkerOptions.workerSrc = false;
  
  console.log('PDF.js configured in legacy mode (no worker)');
};

