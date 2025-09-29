import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ArrowLeft, MapPin, Copy, Files, FileText, Image as ImageIcon, Database } from "lucide-react";
import { UploadedFile, MetadataForm } from "../DataUploadPage";

interface User {
  email: string;
  role: 'researcher' | 'admin';
  name: string;
}

// Extended metadata structure for per-file handling
interface FileMetadata extends MetadataForm {
  fileId: string;
  fileName: string;
  fileType: 'structured' | 'unstructured' | 'semi-structured';
}

interface MetadataFormStepProps {
  uploadedFiles: UploadedFile[];
  initialMetadata: MetadataForm;
  onSubmit: (metadata: MetadataForm) => void;
  onBack: () => void;
  user: User;
}

const OCEANOGRAPHIC_PARAMETERS = [
  "Temperature",
  "Salinity", 
  "pH",
  "Dissolved Oxygen",
  "Current Speed",
  "Current Direction",
  "Pressure/Depth",
  "Turbidity",
  "Chlorophyll-a",
  "Nutrients (Nitrate/Phosphate)",
  "Conductivity",
  "Wave Height",
  "Wind Speed",
  "Wind Direction"
];



export function MetadataFormStep({ 
  uploadedFiles, 
  initialMetadata, 
  onSubmit, 
  onBack, 
  user 
}: MetadataFormStepProps) {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [fileMetadataMap, setFileMetadataMap] = useState<Map<string, FileMetadata>>(new Map());
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize metadata for each file
  useEffect(() => {
    const newMap = new Map<string, FileMetadata>();
    uploadedFiles.forEach((upload, index) => {
      const fileId = `file-${index}`;
      newMap.set(fileId, {
        ...initialMetadata,
        fileId,
        fileName: upload.file.name,
        fileType: upload.type
      });
    });
    setFileMetadataMap(newMap);
  }, [uploadedFiles, initialMetadata]);

  // Get current file metadata
  const getCurrentFileMetadata = (): FileMetadata | undefined => {
    const fileId = `file-${selectedFileIndex}`;
    return fileMetadataMap.get(fileId);
  };

  // Update current file metadata
  const updateCurrentFileMetadata = (updates: Partial<FileMetadata>) => {
    const fileId = `file-${selectedFileIndex}`;
    const currentMeta = fileMetadataMap.get(fileId);
    if (currentMeta) {
      setFileMetadataMap(prev => new Map(prev.set(fileId, { ...currentMeta, ...updates })));
    }
  };

  // Apply batch value to all files
  const applyBatchValue = (field: keyof FileMetadata, value: any) => {
    setFileMetadataMap(prev => {
      const newMap = new Map(prev);
      Array.from(newMap.entries()).forEach(([fileId, metadata]) => {
        newMap.set(fileId, { ...metadata, [field]: value });
      });
      return newMap;
    });
  };

  // Get file type classification for context-sensitive fields
  const getFileTypeGroup = (fileType: string): 'tabular' | 'molecular-image' | 'json' => {
    if (fileType === 'structured') return 'tabular';
    if (fileType === 'unstructured') return 'molecular-image';
    return 'json';
  };

  const validateCurrentTab = (): boolean => {
    const newErrors: Record<string, string> = {};
    const currentMeta = getCurrentFileMetadata();
    
    if (!currentMeta) return false;

    if (!currentMeta.datasetTitle.trim()) {
      newErrors.datasetTitle = "Dataset title is required";
    }
    if (currentMeta.authors.length === 0 || !currentMeta.authors[0]?.trim()) {
      newErrors.authors = "At least one author is required";
    }
    if (!currentMeta.collectionDate) {
      newErrors.collectionDate = "Collection date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate all files for submission
  const validateAllFiles = (): boolean => {
    for (let fileIndex = 0; fileIndex < uploadedFiles.length; fileIndex++) {
      const fileId = `file-${fileIndex}`;
      const metadata = fileMetadataMap.get(fileId);
      
      if (!metadata) return false;
      
      // Check required fields for each file
      if (!metadata.datasetTitle.trim() || 
          metadata.authors.length === 0 || 
          !metadata.authors[0]?.trim() ||
          !metadata.collectionDate) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateAllFiles()) {
      alert("Please complete all required fields for all files before submitting.");
      return;
    }

    // For submission, we'll use the metadata from the first file as the representative metadata
    // In a real implementation, you might want to handle this differently
    const firstFileMetadata = fileMetadataMap.get(`file-0`);
    if (firstFileMetadata) {
      onSubmit(firstFileMetadata);
    }
  };

  const handleParameterChange = (parameter: string, checked: boolean) => {
    const currentMeta = getCurrentFileMetadata();
    if (currentMeta) {
      const newParameters = checked 
        ? [...currentMeta.oceanographicParameters, parameter]
        : currentMeta.oceanographicParameters.filter(p => p !== parameter);
      updateCurrentFileMetadata({ oceanographicParameters: newParameters });
    }
  };

  const handleAuthorChange = (index: number, value: string) => {
    const currentMeta = getCurrentFileMetadata();
    if (currentMeta) {
      const newAuthors = currentMeta.authors.map((author, i) => i === index ? value : author);
      updateCurrentFileMetadata({ authors: newAuthors });
    }
  };

  const addAuthor = () => {
    const currentMeta = getCurrentFileMetadata();
    if (currentMeta) {
      updateCurrentFileMetadata({ authors: [...currentMeta.authors, ""] });
    }
  };

  const removeAuthor = (index: number) => {
    const currentMeta = getCurrentFileMetadata();
    if (currentMeta && currentMeta.authors.length > 1) {
      const newAuthors = currentMeta.authors.filter((_, i) => i !== index);
      updateCurrentFileMetadata({ authors: newAuthors });
    }
  };

  const currentMetadata = getCurrentFileMetadata();
  if (!currentMetadata) return null;

  const fileTypeGroup = getFileTypeGroup(currentMetadata.fileType);

  // Get file type icon
  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'structured':
        return Database;
      case 'unstructured':
        return ImageIcon;
      case 'semi-structured':
        return FileText;
      default:
        return Files;
    }
  };

  const isSubmitDisabled = !validateAllFiles();

  return (
    <TooltipProvider>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mr-4 text-[#1e3a8a] hover:text-[#1e40af]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Upload
        </Button>
        <div>
          <h1 className="text-3xl text-[#1e3a8a]">Dataset Metadata & Compliance</h1>
          <p className="text-gray-600 mt-2">
            Provide metadata to ensure your dataset is FAIR-compliant and AI-ready
          </p>
        </div>
      </div>

      {/* File Navigator */}
      <div className="mb-8">
        <div className="w-full max-w-sm">
          <Label htmlFor="fileNavigator" className="text-gray-700 mb-2 block">
            File Navigator
          </Label>
          <Select
            value={selectedFileIndex.toString()}
            onValueChange={(value) => setSelectedFileIndex(parseInt(value))}
          >
            <SelectTrigger id="fileNavigator">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {uploadedFiles.map((upload, index) => {
                const IconComponent = getFileTypeIcon(upload.type);
                return (
                  <SelectItem key={index} value={index.toString()}>
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4" />
                      <span>{upload.file.name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg mb-4 text-gray-900 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-[#06b6d4]" />
            Core Identity & Provenance (Batch-Editable)
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Essential information for dataset identification and scientific provenance
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="datasetTitle">
                  Dataset Title <span className="text-red-500">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applyBatchValue('datasetTitle', currentMetadata.datasetTitle)}
                      className="text-[#06b6d4] border-[#06b6d4] hover:bg-[#06b6d4] hover:text-white"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy this field value to all files in the current batch</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="datasetTitle"
                value={currentMetadata.datasetTitle}
                onChange={(e) => updateCurrentFileMetadata({ datasetTitle: e.target.value })}
                className={errors.datasetTitle ? "border-red-500" : ""}
                placeholder="Enter a descriptive title for your dataset"
              />
              {errors.datasetTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.datasetTitle}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>
                  Author(s) <span className="text-red-500">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applyBatchValue('authors', currentMetadata.authors)}
                      className="text-[#06b6d4] border-[#06b6d4] hover:bg-[#06b6d4] hover:text-white"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy this field value to all files in the current batch</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="space-y-2">
                {currentMetadata.authors.map((author, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder="Author name"
                      className="flex-1"
                    />
                    {currentMetadata.authors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAuthor(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAuthor}
                >
                  Add Author
                </Button>
              </div>
              {errors.authors && (
                <p className="text-red-500 text-sm mt-1">{errors.authors}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="collectionDate">
                  Date of Collection <span className="text-red-500">*</span>
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applyBatchValue('collectionDate', currentMetadata.collectionDate)}
                      className="text-[#06b6d4] border-[#06b6d4] hover:bg-[#06b6d4] hover:text-white"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy this field value to all files in the current batch</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="collectionDate"
                type="date"
                value={currentMetadata.collectionDate}
                onChange={(e) => updateCurrentFileMetadata({ collectionDate: e.target.value })}
                className={errors.collectionDate ? "border-red-500" : ""}
              />
              {errors.collectionDate && (
                <p className="text-red-500 text-sm mt-1">{errors.collectionDate}</p>
              )}
            </div>

            {/* Context-sensitive fields based on file type */}
            {fileTypeGroup === 'tabular' && (
              <div>
                <Label>
                  Oceanographic Parameters
                </Label>
                <p className="text-sm text-gray-600 mb-3">
                  Select all parameters measured in your tabular dataset (for XGBoost correlation analysis)
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {OCEANOGRAPHIC_PARAMETERS.map((parameter) => (
                    <div key={parameter} className="flex items-center space-x-2">
                      <Checkbox
                        id={parameter}
                        checked={currentMetadata.oceanographicParameters.includes(parameter)}
                        onCheckedChange={(checked) => handleParameterChange(parameter, checked as boolean)}
                      />
                      <Label htmlFor={parameter} className="text-sm">
                        {parameter}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}





            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="sharingConsent"
                  checked={currentMetadata.sharingConsent}
                  onCheckedChange={(checked) => updateCurrentFileMetadata({ sharingConsent: checked as boolean })}
                />
                <div>
                  <Label htmlFor="sharingConsent" className="cursor-pointer">
                    Share this dataset publicly after validation (Optional)
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    If unchecked, your dataset will remain on your profile for personal use. You can change this setting later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-6 py-3"
        >
          Back to Upload
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit for Validation (Reserve DOI)
        </Button>
      </div>
    </div>
    </TooltipProvider>
  );
}