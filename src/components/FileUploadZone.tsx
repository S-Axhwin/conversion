import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadZoneProps {
  onFileSelect: (files: File[]) => void;
}

const FileUploadZone = ({ onFileSelect }: FileUploadZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`p-12 rounded-xl text-center cursor-pointer transition-all duration-200 
        ${isDragActive ? 'border-primary border-2' : 'border-2 border-dashed border-gray-300'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-lg font-medium mb-2">
        {isDragActive ? 'Drop your images here' : 'Drop your images here'}
      </p>
      <p className="text-sm text-muted-foreground">
        or click to select multiple images
      </p>
    </div>
  );
};

export default FileUploadZone;