import React from 'react';
import { FileImage } from 'lucide-react';

interface SelectedFilesPreviewProps {
  files: File[];
}

const SelectedFilesPreview = ({ files }: SelectedFilesPreviewProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {files.slice(0, 3).map((file, index) => (
          <div key={index} className="aspect-square rounded-lg border bg-gray-50 p-2 flex items-center justify-center">
            <div className="text-center">
              <FileImage className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-xs text-gray-500 truncate max-w-[120px]">{file.name}</p>
            </div>
          </div>
        ))}
      </div>
      {files.length > 3 && (
        <p className="text-sm text-muted-foreground">
          +{files.length - 3} more files
        </p>
      )}
    </div>
  );
};

export default SelectedFilesPreview;