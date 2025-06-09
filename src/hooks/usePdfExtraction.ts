
import { useCallback } from 'react';
import { pdfjs } from 'react-pdf';

export const usePdfExtraction = () => {
  const extractTextFromPdf = useCallback(async (
    file: File,
    onProgress: (progress: number) => void,
    onComplete: (text: string) => void,
    onError: (error: string) => void
  ) => {
    console.log('Starting text extraction from:', file.name);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      console.log('File converted to array buffer');
      
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      console.log('PDF document loaded for extraction, pages:', pdf.numPages);
      
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        console.log('Extracting text from page', i);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `\n\n--- Page ${i} ---\n\n${pageText}`;
        
        const progress = Math.round((i / pdf.numPages) * 100);
        onProgress(progress);
      }
      
      console.log('Text extraction completed, length:', fullText.length);
      onComplete(fullText);
    } catch (error) {
      console.error('Text extraction error:', error);
      onError(`Failed to extract text: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, []);

  return { extractTextFromPdf };
};
