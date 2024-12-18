import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ConversionProgressProps {
  progress: number;
}

const ConversionProgress = ({ progress }: ConversionProgressProps) => {
  return (
    <div className="w-full animate-fade-up">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Converting...</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ConversionProgress;