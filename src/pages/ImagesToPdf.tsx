import React, { useState } from 'react';
import FileUploadZone from '@/components/FileUploadZone';
import ConversionProgress from '@/components/ConversionProgress';
import SelectedFilesPreview from '@/components/SelectedFilesPreview';
import SkippedFilesList from '@/components/SkippedFilesList';
import GoogleAd from '@/components/GoogleAd';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { PDFDocument } from 'pdf-lib';

const ImagesToPdf = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [conversionProgress, setConversionProgress] = useState<number>(0);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [skippedFiles, setSkippedFiles] = useState<File[]>([]);
  const [showSkippedFiles, setShowSkippedFiles] = useState(false);

  const handleFileSelect = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type === 'image/jpeg' || 
      file.type === 'image/jpg' || 
      file.type === 'image/png'
    );

    const invalidFiles = files.filter(file => 
      file.type !== 'image/jpeg' && 
      file.type !== 'image/jpg' && 
      file.type !== 'image/png'
    );

    setSkippedFiles(invalidFiles);

    if (invalidFiles.length > 0) {
      toast.error(`${invalidFiles.length} files were skipped. Only JPEG and PNG images are supported.`);
    }

    setSelectedFiles(validFiles);
    setConversionProgress(0);
    setIsConverting(false);
    setIsConverted(false);
  };

  const convertImagesToPdf = async (files: File[]) => {
    const pdfDoc = await PDFDocument.create();
    const totalFiles = files.length;
    let processedFiles = 0;

    for (const file of files) {
      try {
        const imageBytes = await file.arrayBuffer();
        let image;
        
        if (file.type.includes('jpeg') || file.type.includes('jpg')) {
          image = await pdfDoc.embedJpg(imageBytes);
        } else if (file.type.includes('png')) {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
          console.warn('Skipping unsupported file type:', file.type);
          continue;
        }

        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const aspectRatio = image.width / image.height;
        
        let drawWidth = width;
        let drawHeight = height;
        
        if (aspectRatio > 1) {
          drawHeight = width / aspectRatio;
        } else {
          drawWidth = height * aspectRatio;
        }

        page.drawImage(image, {
          x: (width - drawWidth) / 2,
          y: (height - drawHeight) / 2,
          width: drawWidth,
          height: drawHeight,
        });

        processedFiles++;
        setConversionProgress((processedFiles / totalFiles) * 100);
      } catch (error) {
        console.error('Error processing file:', file.name, error);
        toast.error(`Error processing ${file.name}. Skipping file.`);
      }
    }

    if (processedFiles === 0) {
      throw new Error('No valid images could be processed');
    }

    return await pdfDoc.save();
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setIsConverting(true);
    console.log('Starting conversion of', selectedFiles.length, 'images to PDF');
    
    try {
      const pdfBytes = await convertImagesToPdf(selectedFiles);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setIsConverting(false);
      setIsConverted(true);
      toast.success('Conversion completed! Click Download Now to save your PDF.');
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted-images.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Error converting images to PDF. Please try again with different images.');
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Images to PDF Converter</h1>
          <p className="text-lg text-muted-foreground">
            Convert multiple images into a single PDF file
          </p>
        </div>

        {/* Top Ad */}
        <GoogleAd slot="YOUR-AD-SLOT-1" />

        <div className="bg-white rounded-xl shadow-sm border p-8 space-y-6">
          {selectedFiles.length === 0 ? (
            <FileUploadZone onFileSelect={handleFileSelect} />
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedFiles.length} images selected</p>
                    <p className="text-sm text-muted-foreground">
                      Total size: {(selectedFiles.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <SelectedFilesPreview files={selectedFiles} />
              </div>

              {isConverting ? (
                <ConversionProgress progress={conversionProgress} />
              ) : (
                <Button
                  className="w-full"
                  variant="default"
                  size="lg"
                  onClick={handleConvert}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Convert to PDF
                </Button>
              )}

              {skippedFiles.length > 0 && (
                <SkippedFilesList 
                  skippedFiles={skippedFiles}
                  showSkippedFiles={showSkippedFiles}
                  setShowSkippedFiles={setShowSkippedFiles}
                />
              )}
            </>
          )}
        </div>

        {/* Bottom Ad */}
        <GoogleAd slot="YOUR-AD-SLOT-2" />
      </div>
    </div>
  );
};

export default ImagesToPdf;