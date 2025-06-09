
export interface PdfReaderProps {
  onTextExtracted?: (text: string, filename: string) => void;
}

export interface ExtractedFile {
  id: string;
  filename: string;
  text: string;
  uploadDate: Date;
}

export interface PdfState {
  file: File | null;
  numPages: number | null;
  currentPage: number;
  extractedText: string;
  isLoading: boolean;
  isExtracting: boolean;
  loadProgress: number;
  extractProgress: number;
  error: string | null;
}
