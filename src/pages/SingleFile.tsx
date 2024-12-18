import React, { useState } from 'react';
import FileUploadZone from '@/components/FileUploadZone';
import ConversionOptions from '@/components/ConversionOptions';
import ConversionProgress from '@/components/ConversionProgress';
import { Button } from '@/components/ui/button';
import { Download, FileImage } from 'lucide-react';
import { toast } from 'sonner';

const SingleFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [conversionProgress, setConversionProgress] = useState<number>(0);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]; // Take only the first file
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
        setSelectedFile(file);
        setSelectedFormat(null);
        setConversionProgress(0);
        setIsConverting(false);
      } else {
        toast.error('Please select a valid image file (JPEG or PNG)');
      }
    }
  };

  const getCurrentFormat = () => {
    if (!selectedFile) return '';
    if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/jpg') return 'jpg';
    if (selectedFile.type === 'image/png') return 'png';
    return '';
  };

  const handleConvert = async () => {
    if (!selectedFile || !selectedFormat) {
      toast.error('Please select a file and output format');
      return;
    }

    setIsConverting(true);
    // Simulate conversion progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setConversionProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsConverting(false);
        toast.success('Conversion completed!');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Single File Converter</h1>
          <p className="text-lg text-muted-foreground">
            Convert your file to different formats
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8 space-y-6">
          {!selectedFile ? (
            <FileUploadZone onFileSelect={handleFileSelect} />
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Selected file</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="aspect-square w-32 rounded-lg border bg-gray-50 p-2 flex items-center justify-center">
                  <div className="text-center">
                    <FileImage className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">{selectedFile.name}</p>
                  </div>
                </div>

                <ConversionOptions
                  onFormatSelect={setSelectedFormat}
                  selectedFormat={selectedFormat}
                  currentFormat={getCurrentFormat()}
                />
              </div>

              {isConverting ? (
                <ConversionProgress progress={conversionProgress} />
              ) : (
                <Button
                  className="w-full"
                  variant="default"
                  size="lg"
                  onClick={handleConvert}
                  disabled={!selectedFormat}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Convert File
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleFile;