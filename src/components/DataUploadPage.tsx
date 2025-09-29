import { useState } from "react";
import { FileUploadStep } from "./data-upload/FileUploadStep";
import { MetadataFormStep } from "./data-upload/MetadataFormStep";
import { SubmissionStatusStep } from "./data-upload/SubmissionStatusStep";

interface User {
  email: string;
  role: 'researcher' | 'admin';
  name: string;
}

interface DataUploadPageProps {
  user: User | null;
  onNavigateHome: () => void;
}

export type UploadStep = 'upload' | 'metadata' | 'status';

export interface UploadedFile {
  file: File;
  type: 'structured' | 'unstructured' | 'semi-structured';
}

export interface MetadataForm {
  // Core Identity & Provenance
  datasetTitle: string;
  authors: string[];
  collectionDate: string;
  
  // Data Structure & AI-Readiness
  oceanographicParameters: string[];
  
  // Final Submission & Legal
  sharingConsent: boolean;
}

export function DataUploadPage({ user, onNavigateHome }: DataUploadPageProps) {
  const [currentStep, setCurrentStep] = useState<UploadStep>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [metadata, setMetadata] = useState<MetadataForm>({
    datasetTitle: '',
    authors: user ? [user.name] : [],
    collectionDate: '',
    oceanographicParameters: [],
    sharingConsent: false,
  });

  // Redirect if not authorized
  if (!user || (user.role !== 'researcher' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h1 className="text-2xl mb-4 text-[#1e3a8a]">Access Restricted</h1>
          <p className="text-gray-600 mb-6">
            Data upload is only available to authorized researchers and administrators. 
            Please log in with appropriate credentials.
          </p>
          <button
            onClick={onNavigateHome}
            className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg hover:bg-[#1e40af] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    setCurrentStep('metadata');
  };

  const handleMetadataSubmitted = (formData: MetadataForm) => {
    setMetadata(formData);
    setCurrentStep('status');
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
  };

  const handleBackToMetadata = () => {
    setCurrentStep('metadata');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <FileUploadStep
            onFilesUploaded={handleFilesUploaded}
            user={user}
          />
        );
      case 'metadata':
        return (
          <MetadataFormStep
            uploadedFiles={uploadedFiles}
            initialMetadata={metadata}
            onSubmit={handleMetadataSubmitted}
            onBack={handleBackToUpload}
            user={user}
          />
        );
      case 'status':
        return (
          <SubmissionStatusStep
            uploadedFiles={uploadedFiles}
            metadata={metadata}
            onBack={handleBackToMetadata}
            onNavigateHome={onNavigateHome}
            user={user}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep === 'upload' ? 'bg-[#06b6d4] text-white' : 
                ['metadata', 'status'].includes(currentStep) ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${
                ['metadata', 'status'].includes(currentStep) ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep === 'metadata' ? 'bg-[#06b6d4] text-white' : 
                currentStep === 'status' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${
                currentStep === 'status' ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep === 'status' ? 'bg-[#06b6d4] text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                3
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep === 'upload' ? '1' : currentStep === 'metadata' ? '2' : '3'} of 3
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="pt-16">
        {renderStep()}
      </main>
    </div>
  );
}