import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, Clock, FileText, Database, ArrowLeft, Home, User } from "lucide-react";
import { UploadedFile, MetadataForm } from "../DataUploadPage";

interface User {
  email: string;
  role: 'researcher' | 'admin';
  name: string;
}

interface SubmissionStatusStepProps {
  uploadedFiles: UploadedFile[];
  metadata: MetadataForm;
  onBack: () => void;
  onNavigateHome: () => void;
  user: User;
}

interface SubmissionStatus {
  step: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  timestamp?: string;
}

export function SubmissionStatusStep({
  uploadedFiles,
  metadata,
  onBack,
  onNavigateHome,
  user
}: SubmissionStatusStepProps) {
  const [doiReserved] = useState(() => `10.5194/acp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`);
  const [submissionId] = useState(() => `AQC-${Date.now().toString().slice(-8)}`);
  
  const [statusSteps, setStatusSteps] = useState<SubmissionStatus[]>([
    {
      step: 1,
      title: "Files Uploaded to MinIO",
      description: "Your files have been securely stored in our object storage system",
      status: 'completed',
      timestamp: new Date().toISOString()
    },
    {
      step: 2,
      title: "Standardization & Cleaning",
      description: "Data is being processed and standardized using our Go backend",
      status: 'in-progress'
    },
    {
      step: 3,
      title: "DOI Reserved",
      description: "A Digital Object Identifier has been reserved for your dataset",
      status: 'pending'
    },
    {
      step: 4,
      title: "Awaiting Admin Review",
      description: "Your submission is in the moderation queue for final approval",
      status: 'pending'
    }
  ]);

  useEffect(() => {
    // Simulate processing steps
    const timer1 = setTimeout(() => {
      setStatusSteps(prev => prev.map(step => 
        step.step === 2 
          ? { ...step, status: 'completed', timestamp: new Date().toISOString() }
          : step
      ));
    }, 2000);

    const timer2 = setTimeout(() => {
      setStatusSteps(prev => prev.map(step => 
        step.step === 3 
          ? { ...step, status: 'completed', timestamp: new Date().toISOString() }
          : step
      ));
    }, 4000);

    const timer3 = setTimeout(() => {
      setStatusSteps(prev => prev.map(step => 
        step.step === 4 
          ? { ...step, status: 'in-progress', timestamp: new Date().toISOString() }
          : step
      ));
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl mb-4 text-[#1e3a8a]">Submission Successful!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your dataset has been successfully submitted and is now in the validation pipeline. 
          You'll receive notifications as your submission progresses through review.
        </p>
      </div>

      {/* Submission Summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg mb-4 text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-[#06b6d4]" />
            Submission Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Submission ID:</span>
              <span className="text-gray-900 font-mono">{submissionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reserved DOI:</span>
              <span className="text-gray-900 font-mono">{doiReserved}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dataset Title:</span>
              <span className="text-gray-900">{metadata.datasetTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Files Uploaded:</span>
              <span className="text-gray-900">{uploadedFiles.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Submitted by:</span>
              <span className="text-gray-900">{user.name}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg mb-4 text-gray-900 flex items-center">
            <Database className="h-5 w-5 mr-2 text-[#06b6d4]" />
            Data Summary
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Authors:</span>
              <div className="mt-1">
                {metadata.authors.map((author, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-1">
                    {author}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-600">Collection Date:</span>
              <p className="text-gray-900">{metadata.collectionDate}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Processing Status */}
      <Card className="mb-8 p-6">
        <h3 className="text-lg mb-6 text-gray-900">Processing Status</h3>
        <div className="space-y-4">
          {statusSteps.map((step, index) => (
            <div key={step.step} className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm text-gray-900">{step.title}</h4>
                  <Badge className={getStatusColor(step.status)}>
                    {step.status === 'completed' ? 'Completed' : 
                     step.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                {step.timestamp && (
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(step.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="mb-8 p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg mb-4 text-blue-900">What Happens Next?</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Your dataset is now in the admin moderation queue</li>
          <li>• You'll receive email notifications for each processing step</li>
          <li>• Once approved, your dataset will be publicly available with the reserved DOI</li>
          <li>• You can track all your submissions in your personal dashboard</li>
          <li>• Approval typically takes 2-5 business days depending on data complexity</li>
        </ul>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-6 py-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Metadata
        </Button>
        
        <Button
          onClick={() => {
            // Simulate navigation to contributions dashboard
            alert('Navigation to My Contributions Dashboard would happen here');
          }}
          className="bg-[#06b6d4] hover:bg-[#0891b2] text-white px-6 py-3"
        >
          <User className="h-4 w-4 mr-2" />
          My Contributions Dashboard
        </Button>
        
        <Button
          onClick={onNavigateHome}
          className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-3"
        >
          <Home className="h-4 w-4 mr-2" />
          Return to Home
        </Button>
      </div>

      {/* Contact Information */}
      <div className="text-center mt-8 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Questions about your submission? Contact our data team at{" "}
          <a href="mailto:data@aquacore.org" className="text-[#06b6d4] hover:underline">
            data@aquacore.org
          </a>
        </p>
      </div>
    </div>
  );
}