import React from 'react';
import { Button } from '@/components/ui/button';
import { FileType } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConversionOptionsProps {
  onFormatSelect: (format: string) => void;
  selectedFormat: string | null;
  currentFormat: string;
}

const formats = [
  { id: 'pdf', label: 'PDF' },
  { id: 'docx', label: 'Word' },
  { id: 'jpg', label: 'JPG' },
  { id: 'png', label: 'PNG' },
];

const ConversionOptions = ({ onFormatSelect, selectedFormat, currentFormat }: ConversionOptionsProps) => {
  return (
    <div className="animate-fade-up">
      <h3 className="text-lg font-semibold mb-4">Select output format</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {formats.map((format) => {
          const isDisabled = format.id.toLowerCase() === currentFormat.toLowerCase();
          const button = (
            <Button
              key={format.id}
              variant={selectedFormat === format.id ? "default" : "outline"}
              className="hover-scale h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => onFormatSelect(format.id)}
              disabled={isDisabled}
            >
              <FileType className="w-6 h-6" />
              <span>{format.label}</span>
            </Button>
          );

          return isDisabled ? (
            <Tooltip key={format.id}>
              <TooltipTrigger asChild>
                {button}
              </TooltipTrigger>
              <TooltipContent>
                <p>The uploaded file is already in {format.label} format</p>
              </TooltipContent>
            </Tooltip>
          ) : button;
        })}
      </div>
    </div>
  );
};

export default ConversionOptions;