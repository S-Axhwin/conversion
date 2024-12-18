import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SkippedFilesListProps {
  skippedFiles: File[];
  showSkippedFiles: boolean;
  setShowSkippedFiles: (show: boolean) => void;
}

const SkippedFilesList = ({ 
  skippedFiles, 
  showSkippedFiles, 
  setShowSkippedFiles 
}: SkippedFilesListProps) => {
  if (skippedFiles.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm text-red-500">
        {skippedFiles.length} files were skipped (unsupported format)
      </p>
      <Button
        variant="ghost"
        size="sm"
        className="text-sm text-muted-foreground hover:text-foreground"
        onClick={() => setShowSkippedFiles(!showSkippedFiles)}
      >
        {showSkippedFiles ? (
          <ChevronUp className="h-4 w-4 mr-1" />
        ) : (
          <ChevronDown className="h-4 w-4 mr-1" />
        )}
        {showSkippedFiles ? "Hide skipped files" : "Show skipped files"}
      </Button>
      {showSkippedFiles && (
        <div className="pl-4 border-l-2 border-red-200 space-y-1">
          {skippedFiles.map((file, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {file.name} ({file.type || "Unknown type"})
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkippedFilesList;