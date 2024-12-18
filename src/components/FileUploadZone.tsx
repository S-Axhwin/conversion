import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
}

const FileUploadZone = ({ onFileSelect }: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
      toast.success('File uploaded successfully');
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'glass-panel hover-scale w-full p-12 rounded-xl cursor-pointer transition-all duration-200',
        'border-2 border-dashed border-gray-200 hover:border-gray-300',
        isDragActive && 'border-primary bg-primary/5',
        'flex flex-col items-center justify-center gap-4'
      )}
    >
      <input {...getInputProps()} />
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
        <Upload className="w-8 h-8 text-primary" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Drop your file here</h3>
        <p className="text-sm text-muted-foreground">
          or click to select a file
        </p>
      </div>
    </div>
  );
};

export default FileUploadZone;