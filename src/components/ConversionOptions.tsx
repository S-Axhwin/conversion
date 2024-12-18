import React from 'react';
import { FileIcon } from 'lucide-react';

interface ConversionOptionsProps {
  onFormatSelect: (format: string) => void;
  selectedFormat: string | null;
  currentFormat: string;
}

const ConversionOptions = ({ onFormatSelect, selectedFormat, currentFormat }: ConversionOptionsProps) => {
  const formats = ['pdf', 'docx', 'jpg', 'png'];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select output format
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {formats.map((format) => {
          const isDisabled = format.toLowerCase() === currentFormat.toLowerCase();
          const isSelected = format === selectedFormat;
          
          return (
            <button
              key={format}
              onClick={() => !isDisabled && onFormatSelect(format)}
              disabled={isDisabled}
              className={`
                p-4 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center space-y-2
                ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:border-primary cursor-pointer'}
                ${isSelected ? 'bg-black text-white' : 'bg-white'}
              `}
            >
              <FileIcon className="w-6 h-6" />
              <span className="text-sm font-medium">
                {format === 'docx' ? 'Word' : format.toUpperCase()}
              </span>
            </button>
          )}
        )}
      </div>
    </div>
  );
};

export default ConversionOptions;