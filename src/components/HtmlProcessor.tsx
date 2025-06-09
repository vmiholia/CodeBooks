import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, AlertCircle, CheckCircle, Globe } from 'lucide-react';

interface HtmlProcessorProps {
  onTextExtracted: (text: string, filename: string) => void;
}

export const HtmlProcessor: React.FC<HtmlProcessorProps> = ({ onTextExtracted }) => {
  const [url, setUrl] = useState('https://github.com/vmiholia/codebook-tab-builder/blob/main/public/Print_%2093005%20-%20CPT%C2%AE.htm');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Auto-fetch on component mount
  useEffect(() => {
    if (url) {
      handleFetch();
    }
  }, []);

  const convertGithubUrl = (githubUrl: string) => {
    // Convert GitHub blob URL to raw URL and properly encode the path
    const rawUrl = githubUrl
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');
    
    // Split the URL to encode only the filename part
    const urlParts = rawUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    const encodedFilename = encodeURIComponent(filename);
    urlParts[urlParts.length - 1] = encodedFilename;
    
    return urlParts.join('/');
  };

  const extractTextFromHtml = (html: string) => {
    // Create a temporary DOM element to parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Remove script and style elements
    const scripts = doc.querySelectorAll('script, style');
    scripts.forEach(el => el.remove());
    
    // Get text content
    return doc.body?.textContent || doc.textContent || '';
  };

  const handleFetch = async () => {
    if (!url.trim()) {
      setStatus('error');
      setStatusMessage('Please enter a GitHub URL');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const rawUrl = convertGithubUrl(url);
      console.log('Fetching from:', rawUrl);
      
      const response = await fetch(rawUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      
      const htmlContent = await response.text();
      const extractedText = extractTextFromHtml(htmlContent);
      
      if (!extractedText.trim()) {
        throw new Error('No text content found in the HTML file');
      }
      
      // Extract filename from URL
      const filename = url.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'github-html';
      
      onTextExtracted(extractedText, `${filename}.txt`);
      setStatus('success');
      setStatusMessage(`Successfully extracted ${extractedText.length} characters`);
      
    } catch (error) {
      console.error('Error fetching HTML:', error);
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Failed to fetch HTML content');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>GitHub HTML Processor</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub HTML URL</label>
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="https://github.com/user/repo/blob/main/file.html"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleFetch}
              disabled={isLoading}
              size="sm"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isLoading ? 'Fetching...' : 'Fetch'}
            </Button>
          </div>
        </div>

        {status !== 'idle' && (
          <div className={`p-3 rounded-lg border ${getStatusColor()}`}>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className="text-sm font-medium">
                {status === 'success' ? 'Success' : 'Error'}
              </span>
            </div>
            {statusMessage && (
              <p className="text-sm mt-1 text-gray-600">{statusMessage}</p>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>• Automatically converts GitHub blob URLs to raw URLs</p>
          <p>• Extracts text content from HTML files</p>
          <p>• Removes scripts and styling for clean text extraction</p>
        </div>
      </CardContent>
    </Card>
  );
};
