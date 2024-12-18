import React from 'react';
import { Link } from 'react-router-dom';
import { FileImage, Files } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">File Converter</h1>
          <p className="text-lg text-muted-foreground">
            Choose your conversion type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/single-file"
            className="bg-white rounded-xl shadow-sm border p-8 space-y-4 hover:border-primary transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <Files className="w-12 h-12 mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Single File Conversion</h2>
              <p className="text-muted-foreground">
                Convert individual files between different formats
              </p>
            </div>
          </Link>

          <Link 
            to="/images-to-pdf"
            className="bg-white rounded-xl shadow-sm border p-8 space-y-4 hover:border-primary transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <FileImage className="w-12 h-12 mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Images to PDF</h2>
              <p className="text-muted-foreground">
                Combine multiple images into a single PDF file
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;