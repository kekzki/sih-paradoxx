import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Search, 
  BarChart3, 
  Upload, 
  FileImage, 
  FileText,
  Database,
  Dna,
  Download,
  TrendingUp,
  Activity,
  Sliders
} from "lucide-react";

interface User {
  email: string;
  role: 'researcher' | 'admin';
  name: string;
}

interface SearchVisualizationPageProps {
  user: User | null;
}

type PageMode = 'search' | 'visualization';
type DataSource = 'uploaded' | 'platform' | 'select';

export function SearchVisualizationPage({ user }: SearchVisualizationPageProps) {
  const [pageMode, setPageMode] = useState<PageMode>('search');
  const [dataSource, setDataSource] = useState<DataSource>('platform');
  
  // Search filters
  const [searchType, setSearchType] = useState<string>('');
  const [otolithType, setOtolithType] = useState<string>('');
  const [taxonomyType, setTaxonomyType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('');
  
  // Visualization filters
  const [visualizationType, setVisualizationType] = useState<string>('');
  const [simulationType, setSimulationType] = useState<string>('');
  const [ecologyType, setEcologyType] = useState<string>('');
  const [speciesType, setSpeciesType] = useState<string>('');
  const [graphType, setGraphType] = useState<string>('');
  
  // Form data
  const [searchQuery, setSearchQuery] = useState('');
  const [visualizeQuery, setVisualizeQuery] = useState('');
  const [otolithUploadedFile, setOtolithUploadedFile] = useState<File | null>(null);
  const [ednaUploadedFile, setEdnaUploadedFile] = useState<File | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const [parameter1, setParameter1] = useState<string>('');
  const [parameter2, setParameter2] = useState<string>('');

  const handleOtolithFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOtolithUploadedFile(file);
    }
  };

  const handleEdnaFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEdnaUploadedFile(file);
    }
  };

  const triggerImageFileUpload = () => {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput?.click();
  };

  const triggerSequenceFileUpload = () => {
    const fileInput = document.getElementById('sequence-upload') as HTMLInputElement;
    fileInput?.click();
  };

  const resetFilters = () => {
    setSearchType('');
    setOtolithType('');
    setTaxonomyType('');
    setVisualizationType('');
    setSimulationType('');
    setEcologyType('');
    setSpeciesType('');
    setGraphType('');
    setLocation('');
    setTimeFilter('');
    setOtolithUploadedFile(null);
    setEdnaUploadedFile(null);
    setSearchQuery('');
    setVisualizeQuery('');
  };

  const renderSearchContent = () => {
    // Default search interface when no specific type is selected
    if (!searchType) {
      return (
        <Card className="max-w-4xl mx-auto">
          <div className="p-12">
            <div className="flex items-center justify-center mb-8">
              <Search className="h-7 w-7 mr-4 text-[#06b6d4]" />
              <h3 className="text-2xl text-gray-900">Search:</h3>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <Input
                placeholder="Enter what you want to search for (e.g., fish species, location, data type)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-lg p-6 pr-16 border-2 border-gray-200 focus:border-[#06b6d4] rounded-xl"
              />
              <Button 
                className="absolute right-3 top-3 bg-[#06b6d4] hover:bg-[#0891b2] rounded-lg"
                size="sm"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {searchQuery && (
              <div className="mt-8 p-6 bg-blue-50 rounded-xl max-w-2xl mx-auto">
                <p className="text-sm text-gray-600 text-center">
                  💡 For more specific searches, use the filters on the left to select search type (Otolith, Taxonomy, eDNA)
                </p>
              </div>
            )}
          </div>
        </Card>
      );
    }

    if (searchType === 'otolith' && otolithType === 'image') {
      return (
        <div className="space-y-6">
          {!otolithUploadedFile ? (
            <Card className="border-2 border-dashed border-[#06b6d4] bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-[#06b6d4] bg-opacity-10 rounded-full flex items-center justify-center">
                  <Upload className="h-12 w-12 text-[#06b6d4]" />
                </div>
                <h3 className="text-xl mb-3 text-gray-900">Upload Otolith Image</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Upload an otolith image for AI-powered fish species identification using our advanced machine learning models
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleOtolithFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button 
                  size="lg" 
                  className="bg-[#06b6d4] hover:bg-[#0891b2] text-white cursor-pointer"
                  onClick={triggerImageFileUpload}
                >
                  <FileImage className="h-5 w-5 mr-2" />
                  Choose Image File
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-gray-900">Analysis Results</h3>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setOtolithUploadedFile(null)}
                      className="text-[#06b6d4] border-[#06b6d4] hover:bg-[#06b6d4] hover:text-white"
                    >
                      Upload New Image
                    </Button>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Analysis Complete
                    </Badge>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">ID</th>
                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">Name</th>
                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">Confidence</th>
                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: 'OTO001', name: 'Hilsa Fish (Tenualosa ilisha)', confidence: '94.2%' },
                        { id: 'OTO002', name: 'Indian Mackerel (Rastrelliger kanagurta)', confidence: '87.8%' },
                        { id: 'OTO003', name: 'Pomfret (Pampus argenteus)', confidence: '82.1%' }
                      ].map((result, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{result.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{result.name}</td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant="secondary" 
                              className={`${
                                parseFloat(result.confidence) > 90 
                                  ? 'bg-green-100 text-green-800'
                                  : parseFloat(result.confidence) > 80
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {result.confidence}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-[#06b6d4] border-[#06b6d4] hover:bg-[#06b6d4] hover:text-white"
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}
        </div>
      );
    }

    if (searchType === 'otolith' && otolithType === 'text') {
      return (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 mr-3 text-[#06b6d4]" />
                <h3 className="text-xl text-gray-900">Search by Fish Name</h3>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Enter fish species name (e.g., Hilsa, Mackerel, Pomfret)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-lg p-4 pr-16 border-2 border-gray-200 focus:border-[#06b6d4]"
                  />
                  <Button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#06b6d4] hover:bg-[#0891b2] rounded-lg"
                    size="sm"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {searchQuery && (
            <Card>
              <div className="p-6">
                <h3 className="text-xl mb-6 text-gray-900">Search Results</h3>
                <div className="grid gap-4">
                  {[
                    { name: 'Hilsa Fish', scientific: 'Tenualosa ilisha', location: 'Bay of Bengal' },
                    { name: 'Indian Mackerel', scientific: 'Rastrelliger kanagurta', location: 'Arabian Sea' },
                    { name: 'Silver Pomfret', scientific: 'Pampus argenteus', location: 'Indian Ocean' }
                  ].map((fish, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex-1">
                        <h4 className="text-base mb-1 text-gray-900">{fish.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">Scientific: {fish.scientific}</p>
                        <p className="text-sm text-gray-600">Location: {fish.location}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      );
    }

    if (searchType === 'taxonomy' && taxonomyType === 'species') {
      return (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <Database className="h-6 w-6 mr-3 text-[#06b6d4]" />
                <h3 className="text-xl text-gray-900">Search by Species</h3>
              </div>
              <div className="relative">
                <Input
                  placeholder="Enter species or scientific name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg p-4 pr-16 border-2 border-gray-200 focus:border-[#06b6d4]"
                />
                <Button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#06b6d4] hover:bg-[#0891b2] rounded-lg"
                  size="sm"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {searchQuery && (
            <Card>
              <div className="p-6">
                <h3 className="text-xl mb-4 text-gray-900">Species Details</h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg mb-3 text-gray-900">Hilsa Fish</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">Scientific Name:</span> Tenualosa ilisha</p>
                        <p><span className="text-gray-600">Family:</span> Clupeidae</p>
                        <p><span className="text-gray-600">Order:</span> Clupeiformes</p>
                        <p><span className="text-gray-600">Class:</span> Actinopterygii</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg mb-3 text-gray-900">Distribution</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">Primary Habitat:</span> Bay of Bengal</p>
                        <p><span className="text-gray-600">Migration:</span> Anadromous</p>
                        <p><span className="text-gray-600">Depth Range:</span> 0-200m</p>
                        <p><span className="text-gray-600">Status:</span> Commercial</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      );
    }

    if (searchType === 'taxonomy' && taxonomyType === 'class') {
      return (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <Database className="h-6 w-6 mr-3 text-[#06b6d4]" />
                <h3 className="text-xl text-gray-900">Search by Classification</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="mb-3 block">Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="actinopterygii">Actinopterygii</SelectItem>
                      <SelectItem value="chondrichthyes">Chondrichthyes</SelectItem>
                      <SelectItem value="mammalia">Mammalia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-3 block">Order</Label>
                  <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perciformes">Perciformes</SelectItem>
                      <SelectItem value="clupeiformes">Clupeiformes</SelectItem>
                      <SelectItem value="gadiformes">Gadiformes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-3 block">Family</Label>
                  <Select value={selectedFamily} onValueChange={setSelectedFamily}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select family..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scombridae">Scombridae</SelectItem>
                      <SelectItem value="clupeidae">Clupeidae</SelectItem>
                      <SelectItem value="stromateidae">Stromateidae</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {(selectedClass || selectedOrder || selectedFamily) && (
            <>
              <Card>
                <div className="p-6">
                  <h3 className="text-xl mb-6 text-gray-900">Statistics Overview</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                      <div className="text-3xl text-[#1e3a8a] mb-2">2,847</div>
                      <div className="text-sm text-gray-600">Total Records</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                      <div className="text-3xl text-[#1e3a8a] mb-2">156</div>
                      <div className="text-sm text-gray-600">Species Found</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                      <div className="text-3xl text-[#1e3a8a] mb-2">23</div>
                      <div className="text-sm text-gray-600">Families</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                      <div className="text-3xl text-[#1e3a8a] mb-2">8</div>
                      <div className="text-sm text-gray-600">Orders</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-xl mb-6 text-gray-900">Matching Records</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Hilsa Fish', scientific: 'Tenualosa ilisha', records: 45 },
                      { name: 'Indian Mackerel', scientific: 'Rastrelliger kanagurta', records: 38 },
                      { name: 'Silver Pomfret', scientific: 'Pampus argenteus', records: 29 },
                      { name: 'King Fish', scientific: 'Scomberomorus commerson', records: 22 }
                    ].map((species, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h4 className="text-base text-gray-900">{species.name}</h4>
                          <p className="text-sm text-gray-600">{species.scientific}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant="secondary">{species.records} records</Badge>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      );
    }

    if (searchType === 'edna') {
      return (
        <div className="space-y-6">
          {!ednaUploadedFile ? (
            <Card className="border-2 border-dashed border-[#06b6d4] bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-[#06b6d4] bg-opacity-10 rounded-full flex items-center justify-center">
                  <Dna className="h-12 w-12 text-[#06b6d4]" />
                </div>
                <h3 className="text-xl mb-3 text-gray-900">Upload eDNA Sequence</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Upload your environmental DNA sequence file (FASTA format) for species identification and biodiversity analysis
                </p>
                <input
                  type="file"
                  accept=".fasta,.fastq,.txt,.fa"
                  onChange={handleEdnaFileUpload}
                  className="hidden"
                  id="sequence-upload"
                />
                <Button 
                  size="lg" 
                  className="bg-[#06b6d4] hover:bg-[#0891b2] text-white cursor-pointer"
                  onClick={triggerSequenceFileUpload}
                >
                  <Dna className="h-5 w-5 mr-2" />
                  Choose FASTA File
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-gray-900">eDNA Analysis Results</h3>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setEdnaUploadedFile(null)}
                      className="text-[#06b6d4] border-[#06b6d4] hover:bg-[#06b6d4] hover:text-white"
                    >
                      Upload New Sequence
                    </Button>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Processing Complete
                    </Badge>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">ID</th>
                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">Species</th>
                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">Confidence</th>
                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: 'DNA001', name: 'Tenualosa ilisha', confidence: '96.8%' },
                        { id: 'DNA002', name: 'Rastrelliger kanagurta', confidence: '91.4%' },
                        { id: 'DNA003', name: 'Pampus argenteus', confidence: '85.7%' }
                      ].map((result, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{result.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{result.name}</td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant="secondary" 
                              className={`${
                                parseFloat(result.confidence) > 90 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {result.confidence}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-[#06b6d4] border-[#06b6d4] hover:bg-[#06b6d4] hover:text-white"
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}
        </div>
      );
    }

    return null;
  };

  const renderVisualizationContent = () => {
    // Default visualization interface when no specific type is selected
    if (!visualizationType) {
      return (
        <Card className="max-w-4xl mx-auto">
          <div className="p-12">
            <div className="flex items-center justify-center mb-8">
              <BarChart3 className="h-7 w-7 mr-4 text-[#06b6d4]" />
              <h3 className="text-2xl text-gray-900">Visualise:</h3>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <Input
                placeholder="Enter what you want to visualize (e.g., temperature trends, species distribution, parameter relationships)..."
                value={visualizeQuery}
                onChange={(e) => setVisualizeQuery(e.target.value)}
                className="text-lg p-6 pr-16 border-2 border-gray-200 focus:border-[#06b6d4] rounded-xl"
              />
              <Button 
                className="absolute right-3 top-3 bg-[#06b6d4] hover:bg-[#0891b2] rounded-lg"
                size="sm"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
            {visualizeQuery && (
              <div className="mt-8 p-6 bg-blue-50 rounded-xl max-w-2xl mx-auto">
                <p className="text-sm text-gray-600 text-center">
                  💡 For advanced visualizations, use the filters on the left to select visualization type (Simulation, Ecology, Species-Specific)
                </p>
              </div>
            )}
          </div>
        </Card>
      );
    }

    if (visualizationType === 'simulation' && simulationType === 'predictive') {
      return (
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Sliders className="h-6 w-6 mr-3 text-[#06b6d4]" />
                <h3 className="text-xl text-gray-900">Predictive Visualization Controls</h3>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <Label>Temperature (°C)</Label>
                    <span className="text-sm text-gray-600">15°C</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="35"
                    defaultValue="15"
                    className="w-full h-3 bg-gradient-to-r from-blue-400 to-red-400 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Arctic (-5°C)</span>
                    <span>Tropical (35°C)</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-3">
                    <Label>Salinity (ppt)</Label>
                    <span className="text-sm text-gray-600">35 ppt</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="45"
                    defaultValue="35"
                    className="w-full h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Freshwater (0 ppt)</span>
                    <span>Hypersaline (45 ppt)</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-3">
                    <Label>pH Level</Label>
                    <span className="text-sm text-gray-600">8.1</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="9"
                    step="0.1"
                    defaultValue="8.1"
                    className="w-full h-3 bg-gradient-to-r from-red-400 to-green-400 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Acidic (6.0)</span>
                    <span>Alkaline (9.0)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <Label>Oxygen Level (mg/L)</Label>
                    <span className="text-sm text-gray-600">7.5 mg/L</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    defaultValue="7.5"
                    className="w-full h-3 bg-gradient-to-r from-red-400 to-cyan-400 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Hypoxic (0 mg/L)</span>
                    <span>Supersaturated (15 mg/L)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 flex items-center justify-center min-h-80">
                <div className="text-center">
                  <TrendingUp className="h-20 w-20 text-[#06b6d4] mx-auto mb-4" />
                  <h4 className="text-lg mb-2 text-gray-900">Real-time Prediction Graph</h4>
                  <p className="text-gray-600 mb-4">Species survival probability based on environmental parameters</p>
                  <div className="bg-white rounded p-4 inline-block">
                    <span className="text-2xl text-green-600">87.4%</span>
                    <p className="text-sm text-gray-600">Predicted Survival Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    if (visualizationType === 'simulation' && simulationType === 'comparison') {
      return (
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Activity className="h-6 w-6 mr-3 text-[#06b6d4]" />
                <h3 className="text-xl text-gray-900">Species Comparison Analysis</h3>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Chart
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <Label className="mb-3 block">Constant Variable</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select constant..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperature">Temperature</SelectItem>
                    <SelectItem value="salinity">Salinity</SelectItem>
                    <SelectItem value="ph">pH Level</SelectItem>
                    <SelectItem value="oxygen">Oxygen Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-3 block">Variable Parameter</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select variable..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salinity">Salinity</SelectItem>
                    <SelectItem value="temperature">Temperature</SelectItem>
                    <SelectItem value="ph">pH Level</SelectItem>
                    <SelectItem value="depth">Depth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-3 block">Species to Compare</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select species..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hilsa">Hilsa vs Mackerel</SelectItem>
                    <SelectItem value="pomfret">Pomfret vs Kingfish</SelectItem>
                    <SelectItem value="all">All Major Species</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 flex items-center justify-center min-h-96">
              <div className="text-center">
                <BarChart3 className="h-24 w-24 text-[#06b6d4] mx-auto mb-4" />
                <h4 className="text-lg mb-2 text-gray-900">Comparative Analysis Chart</h4>
                <p className="text-gray-600">Configure parameters above to generate species comparison visualization</p>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    // Ecology visualizations
    if (visualizationType === 'ecology') {
      if (!ecologyType) {
        return (
          <Card>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Activity className="h-6 w-6 mr-3 text-[#06b6d4]" />
                <h3 className="text-xl text-gray-900">Ecological Parameter Analysis</h3>
              </div>
              <p className="text-gray-600">Select an analysis type from the filters to view ecological data visualizations.</p>
            </div>
          </Card>
        );
      }

      if (ecologyType === 'parameter-comparison' && parameter1 && parameter2) {
        return (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Activity className="h-6 w-6 mr-3 text-[#06b6d4]" />
                  <h3 className="text-xl text-gray-900">{parameter1.charAt(0).toUpperCase() + parameter1.slice(1)} vs {parameter2.charAt(0).toUpperCase() + parameter2.slice(1)}</h3>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Chart
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 flex items-center justify-center min-h-96">
                <div className="text-center">
                  <BarChart3 className="h-24 w-24 text-[#06b6d4] mx-auto mb-4" />
                  <h4 className="text-lg mb-2 text-gray-900">Parameter Correlation Analysis</h4>
                  <p className="text-gray-600 mb-4">Correlation between {parameter1} and {parameter2} across marine ecosystems</p>
                  <div className="bg-white rounded p-4 inline-block">
                    <span className="text-2xl text-blue-600">r = 0.73</span>
                    <p className="text-sm text-gray-600">Correlation Coefficient</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      }

      if (ecologyType && ecologyType !== 'parameter-comparison') {
        const parameterName = ecologyType.replace('-', ' ');
        return (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Activity className="h-6 w-6 mr-3 text-[#06b6d4]" />
                  <h3 className="text-xl text-gray-900">{parameterName.charAt(0).toUpperCase() + parameterName.slice(1)} Analysis</h3>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg mb-4 text-gray-900">{parameterName.charAt(0).toUpperCase() + parameterName.slice(1)} vs Species Distribution</h4>
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 text-[#06b6d4] mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Distribution Chart</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg mb-4 text-gray-900">{parameterName.charAt(0).toUpperCase() + parameterName.slice(1)} vs Biomass</h4>
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-[#06b6d4] mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Biomass Correlation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg mb-4 text-gray-900">{parameterName.charAt(0).toUpperCase() + parameterName.slice(1)} Temporal Trends</h4>
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="h-16 w-16 text-[#06b6d4] mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Time Series</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg mb-4 text-gray-900">{parameterName.charAt(0).toUpperCase() + parameterName.slice(1)} Spatial Distribution</h4>
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-red-500 rounded mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Heatmap</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      }
    }

    // Species-specific visualizations
    if (visualizationType === 'species') {
      return (
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Database className="h-6 w-6 mr-3 text-[#06b6d4]" />
                <h3 className="text-xl text-gray-900">Species-Specific Analysis</h3>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 flex items-center justify-center min-h-96">
              <div className="text-center">
                <TrendingUp className="h-24 w-24 text-[#06b6d4] mx-auto mb-4" />
                <h4 className="text-lg mb-2 text-gray-900">Species Analysis Dashboard</h4>
                <p className="text-gray-600">Configure species selection from the filters to view population trends, migration patterns, and environmental responses</p>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    // Default fallback
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">Select specific visualization options to view content</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Top Center Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
            <div className="flex">
              <button
                onClick={() => { setPageMode('search'); resetFilters(); }}
                className={`flex items-center px-8 py-3 rounded-full transition-all duration-200 ${
                  pageMode === 'search'
                    ? 'bg-[#06b6d4] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
              <button
                onClick={() => { setPageMode('visualization'); resetFilters(); }}
                className={`flex items-center px-8 py-3 rounded-full transition-all duration-200 ${
                  pageMode === 'visualization'
                    ? 'bg-[#06b6d4] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Visualization
              </button>
            </div>
          </div>
        </div>

        {/* Right Data Source Toggle */}
        <div className="flex justify-end mb-8">
          <div className="bg-white rounded-full p-1 shadow-md border border-gray-200">
            <div className="flex">
              <button
                onClick={() => setDataSource('uploaded')}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  dataSource === 'uploaded'
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Uploaded Data
              </button>
              <button
                onClick={() => setDataSource('platform')}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  dataSource === 'platform'
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Platform Data
              </button>
              <button
                onClick={() => setDataSource('select')}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  dataSource === 'select'
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Select Source
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 shadow-md">
              <div className="p-6">
                <h3 className="text-lg mb-6 text-gray-900 flex items-center">
                  <div className="w-2 h-2 bg-[#06b6d4] rounded-full mr-3"></div>
                  Filters
                </h3>
                
                <div className="space-y-6">
                  {/* Type Filter */}
                  <div>
                    <Label className="text-base mb-3 block text-gray-700">Type</Label>
                    {pageMode === 'search' ? (
                      <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="otolith">Otolith</SelectItem>
                          <SelectItem value="taxonomy">Taxonomy</SelectItem>
                          <SelectItem value="edna">eDNA</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select value={visualizationType} onValueChange={setVisualizationType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simulation">Simulation</SelectItem>
                          <SelectItem value="ecology">Ecology</SelectItem>
                          <SelectItem value="species">Species-Specific</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {/* Sub-type Filters */}
                  {pageMode === 'search' && searchType === 'otolith' && (
                    <div>
                      <Label className="text-base mb-3 block text-gray-700">Otolith Type</Label>
                      <Select value={otolithType} onValueChange={setOtolithType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select method..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image Based</SelectItem>
                          <SelectItem value="text">Text Based</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {pageMode === 'search' && searchType === 'taxonomy' && (
                    <div>
                      <Label className="text-base mb-3 block text-gray-700">Search Method</Label>
                      <Select value={taxonomyType} onValueChange={setTaxonomyType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select method..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="species">By Species Name</SelectItem>
                          <SelectItem value="class">By Classification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {pageMode === 'visualization' && visualizationType === 'simulation' && (
                    <div>
                      <Label className="text-base mb-3 block text-gray-700">Simulation Type</Label>
                      <Select value={simulationType} onValueChange={setSimulationType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select simulation..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="predictive">Predictive Visualization</SelectItem>
                          <SelectItem value="comparison">Species Comparison</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {pageMode === 'visualization' && visualizationType === 'ecology' && (
                    <div>
                      <Label className="text-base mb-3 block text-gray-700">Analysis Type</Label>
                      <Select value={ecologyType} onValueChange={setEcologyType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select analysis..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="temperature">Temperature</SelectItem>
                          <SelectItem value="salinity">Salinity</SelectItem>
                          <SelectItem value="current-speed">Current Speed</SelectItem>
                          <SelectItem value="depth">Depth</SelectItem>
                          <SelectItem value="turbidity">Turbidity</SelectItem>
                          <SelectItem value="parameter-comparison">Parameter 1 vs Parameter 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Parameter Selection for Parameter Comparison */}
                  {pageMode === 'visualization' && visualizationType === 'ecology' && ecologyType === 'parameter-comparison' && (
                    <>
                      <div>
                        <Label className="text-base mb-3 block text-gray-700">Parameter 1</Label>
                        <Select value={parameter1} onValueChange={setParameter1}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select parameter 1..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="temperature">Temperature</SelectItem>
                            <SelectItem value="salinity">Salinity</SelectItem>
                            <SelectItem value="current-speed">Current Speed</SelectItem>
                            <SelectItem value="depth">Depth</SelectItem>
                            <SelectItem value="turbidity">Turbidity</SelectItem>
                            <SelectItem value="ph">pH Level</SelectItem>
                            <SelectItem value="oxygen">Dissolved Oxygen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-base mb-3 block text-gray-700">Parameter 2</Label>
                        <Select value={parameter2} onValueChange={setParameter2}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select parameter 2..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="temperature">Temperature</SelectItem>
                            <SelectItem value="salinity">Salinity</SelectItem>
                            <SelectItem value="current-speed">Current Speed</SelectItem>
                            <SelectItem value="depth">Depth</SelectItem>
                            <SelectItem value="turbidity">Turbidity</SelectItem>
                            <SelectItem value="ph">pH Level</SelectItem>
                            <SelectItem value="oxygen">Dissolved Oxygen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {pageMode === 'visualization' && visualizationType === 'species' && (
                    <div>
                      <Label className="text-base mb-3 block text-gray-700">Species Analysis</Label>
                      <Select value={speciesType} onValueChange={setSpeciesType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select analysis..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Species</SelectItem>
                          <SelectItem value="specific">Specific Species</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Graph Type Filter (Visualization only) */}
                  {pageMode === 'visualization' && (
                    <div>
                      <Label className="text-base mb-3 block text-gray-700">Graph Type</Label>
                      <Select value={graphType} onValueChange={setGraphType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select graph..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="heatmap">Heatmap</SelectItem>
                          <SelectItem value="timeseries">Time Series</SelectItem>
                          <SelectItem value="bar">Bar Graph</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Separator />

                  {/* Location Filter */}
                  <div>
                    <Label className="text-base mb-3 block text-gray-700">Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select location..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bay-of-bengal">Bay of Bengal</SelectItem>
                        <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
                        <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
                        <SelectItem value="kerala-coast">Kerala Coast</SelectItem>
                        <SelectItem value="tamil-nadu-coast">Tamil Nadu Coast</SelectItem>
                        <SelectItem value="gujarat-coast">Gujarat Coast</SelectItem>
                        <SelectItem value="west-bengal-coast">West Bengal Coast</SelectItem>
                        <SelectItem value="odisha-coast">Odisha Coast</SelectItem>
                        <SelectItem value="andhra-pradesh-coast">Andhra Pradesh Coast</SelectItem>
                        <SelectItem value="karnataka-coast">Karnataka Coast</SelectItem>
                        <SelectItem value="goa-coast">Goa Coast</SelectItem>
                        <SelectItem value="maharashtra-coast">Maharashtra Coast</SelectItem>
                        <SelectItem value="lakshadweep">Lakshadweep Waters</SelectItem>
                        <SelectItem value="andaman-nicobar">Andaman & Nicobar Waters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Filter */}
                  <div>
                    <Label className="text-base mb-3 block text-gray-700">Time Period</Label>
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select period..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                        <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                        <SelectItem value="last-year">Last Year</SelectItem>
                        <SelectItem value="last-2-years">Last 2 Years</SelectItem>
                        <SelectItem value="last-5-years">Last 5 Years</SelectItem>
                        <SelectItem value="monsoon-2024">Monsoon 2024</SelectItem>
                        <SelectItem value="winter-2024">Winter 2024</SelectItem>
                        <SelectItem value="summer-2024">Summer 2024</SelectItem>
                        <SelectItem value="post-monsoon-2024">Post-Monsoon 2024</SelectItem>
                        <SelectItem value="all-time">All Time Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Central Content Area */}
          <div className="lg:col-span-4">
            {pageMode === 'search' ? renderSearchContent() : renderVisualizationContent()}
          </div>
        </div>
      </div>
    </div>
  );
}