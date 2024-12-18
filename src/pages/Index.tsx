import React, { useState } from 'react';
import FileUploadZone from '@/components/FileUploadZone';
import ConversionOptions from '@/components/ConversionOptions';
import ConversionProgress from '@/components/ConversionProgress';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [conversionProgress, setConversionProgress] = useState<number>(0);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setConversionProgress(0);
    setIsConverting(false);
    setIsConverted(false);
    setSelectedFormat(null);
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const downloadFile = (file: File, format: string) => {
    console.log('Downloading file:', file.name, 'in format:', format);
    // Create a URL for the file
    const url = URL.createObjectURL(file);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    
    // Set the download filename with the new format
    const originalName = file.name.split('.')[0];
    link.download = `${originalName}.${format}`;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    URL.revokeObjectURL(url);
    toast.success('File downloaded successfully!');
  };

  const handleConvert = async () => {
    if (!selectedFile || !selectedFormat) {
      toast.error('Please select a file and output format');
      return;
    }

    setIsConverting(true);
    console.log('Starting conversion of:', selectedFile.name, 'to format:', selectedFormat);
    
    // Simulate conversion progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setConversionProgress(progress);
      console.log('Conversion progress:', progress + '%');
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsConverting(false);
        setIsConverted(true);
        console.log('Conversion completed, ready for download');
        toast.success('Conversion completed! Click Download Now to save your file.');
      }
    }, 500);
  };

  const handleDownload = () => {
    if (selectedFile && selectedFormat) {
      downloadFile(selectedFile, selectedFormat);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">File Converter</h1>
          <p className="text-lg text-muted-foreground">
            Convert your files to any format with ease
          </p>
        </div>

        <FileUploadZone onFileSelect={handleFileSelect} />

        {selectedFile && (
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <ConversionOptions
              onFormatSelect={setSelectedFormat}
              selectedFormat={selectedFormat}
              currentFormat={getFileExtension(selectedFile.name)}
            />

            {isConverting ? (
              <ConversionProgress progress={conversionProgress} />
            ) : (
              <Button
                className="w-full hover-scale"
                onClick={isConverted ? handleDownload : handleConvert}
                disabled={!selectedFormat}
              >
                <Download className="w-4 h-4 mr-2" />
                {isConverted 
                  ? `Download as ${selectedFormat?.toUpperCase()}` 
                  : 'Convert Now'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;