import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Upload, FileText, Image, Database, X, AlertCircle } from "lucide-react";
import { UploadedFile } from "../DataUploadPage";

interface User {
  email: string;
  role: 'researcher' | 'admin';
  name: string;
}

interface FileUploadStepProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  user: User;
}

const ACCEPTED_FORMATS = {
  structured: {
    label: "Structured Data (PostgreSQL)",
    formats: [".csv", ".xlsx", ".nc (NetCDF)", ".hdf5"],
    description: "High-value tabular and multi-dimensional ocean data",
    icon: Database,
    color: "text-blue-600"
  },
  unstructured: {
    label: "Unstructured/Molecular Data (MinIO & AI)",
    formats: [".jpg", ".png", ".pdf", "FASTA", "FASTQ"],
    description: "Raw files, images for CNN, and genetic data for BLAST",
    icon: Image,
    color: "text-green-600"
  },
  semiStructured: {
    label: "Semi-Structured Data (Elasticsearch)",
    formats: [".json", ".xml"],
    description: "Formats optimized for metadata indexing",
    icon: FileText,
    color: "text-purple-600"
  }
};

export function FileUploadStep({ onFilesUploaded, user }: FileUploadStepProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileType = (file: File): 'structured' | 'unstructured' | 'semi-structured' => {
    const extension = file.name.toLowerCase().split('.').pop() || '';
    const name = file.name.toLowerCase();
    
    if (['csv', 'xlsx', 'nc', 'hdf5'].includes(extension)) {
      return 'structured';
    }
    if (['jpg', 'jpeg', 'png', 'pdf'].includes(extension) || name.includes('fasta') || name.includes('fastq')) {
      return 'unstructured';
    }
    if (['json', 'xml'].includes(extension)) {
      return 'semi-structured';
    }
    return 'unstructured'; // default
  };

  const validateFile = (file: File): string | null => {
    const extension = file.name.toLowerCase().split('.').pop() || '';
    const name = file.name.toLowerCase();
    
    const allowedExtensions = ['csv', 'xlsx', 'nc', 'hdf5', 'jpg', 'jpeg', 'png', 'pdf', 'json', 'xml'];
    const allowedNames = ['fasta', 'fastq'];
    
    const isValidExtension = allowedExtensions.includes(extension);
    const isValidName = allowedNames.some(n => name.includes(n));
    
    if (!isValidExtension && !isValidName) {
      return `Invalid file type: ${file.name}. Please check accepted formats.`;
    }
    
    // Check file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      return `File too large: ${file.name}. Maximum size is 100MB.`;
    }
    
    return null;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileSelection(files);
  };

  const handleFileSelection = (files: File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    setErrors(newErrors);
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (selectedFiles.length === 0) {
      setErrors(["Please select at least one file to continue."]);
      return;
    }

    const uploadedFiles: UploadedFile[] = selectedFiles.map(file => ({
      file,
      type: getFileType(file)
    }));

    onFilesUploaded(uploadedFiles);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-4 text-[#1e3a8a]">Contribute Data & Research</h1>
        <p className="text-gray-600">
          Upload your research data to contribute to the global marine science community. 
          All submissions undergo validation to ensure data quality and scientific integrity.
        </p>
      </div>

      {/* File Upload Area */}
      <Card className="mb-8">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver ? 'border-[#06b6d4] bg-blue-50' : 'border-gray-300 hover:border-[#06b6d4]'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg mb-2 text-gray-900">Drop files here or click to browse</h3>
          <p className="text-gray-600 mb-4">
            Support for bulk file selection. Maximum file size: 100MB per file.
          </p>
          <Button
            onClick={openFileDialog}
            className="bg-[#06b6d4] hover:bg-[#0891b2] text-white"
          >
            Select Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
            accept=".csv,.xlsx,.nc,.hdf5,.jpg,.jpeg,.png,.pdf,.json,.xml"
          />
        </div>
      </Card>

      {/* Accepted Formats */}
      <div className="mb-8">
        <h2 className="text-xl mb-6 text-[#1e3a8a]">Accepted File Formats</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(ACCEPTED_FORMATS).map(([key, format]) => {
            const IconComponent = format.icon;
            return (
              <Card key={key} className="p-6">
                <div className="flex items-start space-x-3">
                  <IconComponent className={`h-6 w-6 ${format.color} flex-shrink-0 mt-1`} />
                  <div>
                    <h3 className="mb-2 text-gray-900">{format.label}</h3>
                    <div className="text-sm text-gray-600 mb-3">
                      {format.formats.join(", ")}
                    </div>
                    <p className="text-sm text-gray-500">{format.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <span className="text-blue-800">
            All files are securely stored in a private bucket on MinIO object storage.
          </span>
        </div>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <Card className="mb-8 p-6">
          <h3 className="mb-4 text-gray-900">Selected Files ({selectedFiles.length})</h3>
          <div className="space-y-3">
            {selectedFiles.map((file, index) => {
              const fileType = getFileType(file);
              const formatInfo = Object.values(ACCEPTED_FORMATS).find(f => 
                f.label.toLowerCase().includes(fileType.replace('-', ''))
              );
              const IconComponent = formatInfo?.icon || FileText;
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`h-5 w-5 ${formatInfo?.color || 'text-gray-600'}`} />
                    <div>
                      <div className="text-sm text-gray-900">{file.name}</div>
                      <div className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {fileType.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <Card className="mb-8 p-6 border-red-200 bg-red-50">
          <h3 className="text-red-800 mb-3">Upload Issues</h3>
          <ul className="text-red-700 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={selectedFiles.length === 0}
          className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-8 py-3"
        >
          Add Metadata & Compliance
        </Button>
      </div>
    </div>
  );
}