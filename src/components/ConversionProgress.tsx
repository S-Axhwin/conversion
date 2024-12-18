import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ConversionProgressProps {
  progress: number;
}

const ConversionProgress = ({ progress }: ConversionProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Converting...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};

export default ConversionProgress;