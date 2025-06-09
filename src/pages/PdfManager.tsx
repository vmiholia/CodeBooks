
import React, { useState } from 'react';
import { HtmlProcessor } from '@/components/HtmlProcessor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Trash2, ArrowLeft, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExtractedFile {
  id: string;
  filename: string;
  text: string;
  uploadDate: Date;
}

const PdfManager = () => {
  const navigate = useNavigate();
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);

  const handleTextExtracted = (text: string, filename: string) => {
    const newFile: ExtractedFile = {
      id: Date.now().toString(),
      filename,
      text,
      uploadDate: new Date(),
    };
    setExtractedFiles(prev => [newFile, ...prev]);
  };

  const removeFile = (id: string) => {
    setExtractedFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Codes
            </Button>
            <h1 className="text-xl font-semibold flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>HTML Text Extractor</span>
            </h1>
          </div>
          <Badge variant="outline">{extractedFiles.length} files processed</Badge>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* HTML Processor */}
          <div>
            <HtmlProcessor onTextExtracted={handleTextExtracted} />
          </div>

          {/* Extracted Files List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Extracted Text Files</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {extractedFiles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No HTML files processed yet</p>
                    <p className="text-sm">Enter a GitHub HTML URL to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {extractedFiles.map((file) => (
                      <div key={file.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium truncate">{file.filename}</h3>
                            <p className="text-sm text-muted-foreground">
                              {file.uploadDate.toLocaleDateString()} at {file.uploadDate.toLocaleTimeString()}
                            </p>
                          </div>
                          <Button
                            onClick={() => removeFile(file.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="bg-muted/50 rounded p-3 max-h-32 overflow-auto">
                          <p className="text-sm font-mono">
                            {file.text.substring(0, 200)}
                            {file.text.length > 200 && '...'}
                          </p>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <Badge variant="outline">
                            {(file.text.length / 1000).toFixed(1)}k characters
                          </Badge>
                          <Button size="sm" variant="outline">
                            View Full Text
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfManager;
