import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, BarChart3, Upload, FileImage, FileText, Database, Dna, Download, TrendingUp, Activity, Sliders } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from "recharts";

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

const speciesData = [
  { name: "Hilsa", count: 120 },
  { name: "Mackerel", count: 90 },
  { name: "Pomfret", count: 70 },
  { name: "Kingfish", count: 45 },
];

const biomassData = [
  { month: "Jan", biomass: 1000 },
  { month: "Feb", biomass: 1100 },
  { month: "Mar", biomass: 950 },
  { month: "Apr", biomass: 1150 },
  { month: "May", biomass: 1300 },
  { month: "Jun", biomass: 1250 },
];

const trendsData = [
  { year: 2020, value: 500 },
  { year: 2021, value: 650 },
  { year: 2022, value: 700 },
  { year: 2023, value: 850 },
  { year: 2024, value: 920 },
];

const locationData = [
  { location: "Bay of Bengal", density: 80 },
  { location: "Arabian Sea", density: 60 },
  { location: "Kerala", density: 45 },
  { location: "Tamil Nadu", density: 70 },
];

const comparisonData = [
  { param: "10°C", hilsa: 30, mackerel: 45 },
  { param: "15°C", hilsa: 55, mackerel: 70 },
  { param: "20°C", hilsa: 85, mackerel: 90 },
  { param: "25°C", hilsa: 75, mackerel: 65 },
  { param: "30°C", hilsa: 40, mackerel: 35 },
];

const COLORS = ["#06b6d4", "#0891b2", "#0e7490", "#155e75"];

export default function SearchVisualizationPage({ user }: SearchVisualizationPageProps) {
  const [pageMode, setPageMode] = useState<PageMode>('search');
  const [dataSource, setDataSource] = useState<DataSource>('platform');
  const [searchType, setSearchType] = useState<string>('');
  const [otolithType, setOtolithType] = useState<string>('');
  const [taxonomyType, setTaxonomyType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('');
  const [visualizationType, setVisualizationType] = useState<string>('');
  const [simulationType, setSimulationType] = useState<string>('');
  const [ecologyType, setEcologyType] = useState<string>('');
  const [speciesType, setSpeciesType] = useState<string>('');
  const [graphType, setGraphType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visualizeQuery, setVisualizeQuery] = useState('');
  const [otolithUploadedFile, setOtolithUploadedFile] = useState<File | null>(null);
  const [ednaUploadedFile, setEdnaUploadedFile] = useState<File | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const [parameter1, setParameter1] = useState<string>('');
  const [parameter2, setParameter2] = useState<string>('');
  const [tempValue, setTempValue] = useState(15);
  const [salinityValue, setSalinityValue] = useState(35);
  const [phValue, setPhValue] = useState(8.1);
  const [oxygenValue, setOxygenValue] = useState(7.5);

  const calculateSurvival = () => {
    const tempScore = Math.max(0, 100 - Math.abs(tempValue - 25) * 2);
    const salinityScore = Math.max(0, 100 - Math.abs(salinityValue - 35) * 1.5);
    const phScore = Math.max(0, 100 - Math.abs(phValue - 8.1) * 10);
    const oxygenScore = Math.min(100, Math.max(0, (oxygenValue / 8) * 100));
    return ((tempScore + salinityScore + phScore + oxygenScore) / 4).toFixed(1);
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
    setParameter1('');
    setParameter2('');
  };

  const renderSearchContent = () => {
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
                placeholder="Enter what you want to search for..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="text-lg p-6 pr-16 border-2 border-gray-200 focus:border-[#06b6d4] rounded-xl" 
              />
              <Button className="absolute right-3 top-3 bg-[#06b6d4] hover:bg-[#0891b2] rounded-lg" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {searchQuery && (
              <div className="mt-8 p-6 bg-blue-50 rounded-xl max-w-2xl mx-auto">
                <p className="text-sm text-gray-600 text-center">For more specific searches, use the filters on the left</p>
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
                <p className="text-gray-600 mb-6 max-w-md mx-auto">Upload an otolith image for AI-powered fish species identification</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => { 
                    const f = e.target.files?.[0]; 
                    if (f) setOtolithUploadedFile(f); 
                  }} 
                  className="hidden" 
                  id="image-upload" 
                />
                <Button 
                  size="lg" 
                  className="bg-[#06b6d4] hover:bg-[#0891b2] text-white" 
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <FileImage className="h-5 w-5 mr-2" />Choose Image File
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
                      className="text-[#06b6d4] border-[#06b6d4]"
                    >
                      Upload New
                    </Button>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {['ID', 'Name', 'Confidence', 'Action'].map(header => (
                          <th key={header} className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: 'OTO001', name: 'Hilsa Fish', confidence: 94.2 },
                        { id: 'OTO002', name: 'Indian Mackerel', confidence: 87.8 },
                        { id: 'OTO003', name: 'Pomfret', confidence: 82.1 }
                      ].map((result, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{result.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{result.name}</td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant="secondary" 
                              className={result.confidence > 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                            >
                              {result.confidence}%
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="outline" size="sm" className="text-[#06b6d4] border-[#06b6d4]">View</Button>
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
              <div className="relative">
                <Input 
                  placeholder="Enter fish species name..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="text-lg p-4 pr-16" 
                />
                <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#06b6d4]" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
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
                    { name: 'Indian Mackerel', scientific: 'Rastrelliger kanagurta', location: 'Arabian Sea' }
                  ].map((fish, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="text-base mb-1 text-gray-900">{fish.name}</h4>
                        <p className="text-sm text-gray-600">Scientific: {fish.scientific}</p>
                        <p className="text-sm text-gray-600">Location: {fish.location}</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
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
                  placeholder="Enter species name..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="text-lg p-4 pr-16" 
                />
                <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#06b6d4]" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
          {searchQuery && (
            <Card>
              <div className="p-6">
                <h3 className="text-xl mb-4 text-gray-900">Species Details</h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg mb-3 text-gray-900">Hilsa Fish</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">Scientific:</span> Tenualosa ilisha</p>
                        <p><span className="text-gray-600">Family:</span> Clupeidae</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg mb-3 text-gray-900">Distribution</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">Habitat:</span> Bay of Bengal</p>
                        <p><span className="text-gray-600">Status:</span> Commercial</p>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-lg mb-4 text-gray-900">Species Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie 
                      data={speciesData} 
                      dataKey="count" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={100} 
                      label
                    >
                      {speciesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
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
                {[
                  { label: 'Class', value: selectedClass, setter: setSelectedClass, opts: ['actinopterygii', 'chondrichthyes'] },
                  { label: 'Order', value: selectedOrder, setter: setSelectedOrder, opts: ['perciformes', 'clupeiformes'] },
                  { label: 'Family', value: selectedFamily, setter: setSelectedFamily, opts: ['scombridae', 'clupeidae'] }
                ].map((selectConfig, index) => (
                  <div key={index}>
                    <Label className="mb-3 block">{selectConfig.label}</Label>
                    <Select value={selectConfig.value} onValueChange={selectConfig.setter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {selectConfig.opts.map(option => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          {(selectedClass || selectedOrder || selectedFamily) && (
            <>
              <Card>
                <div className="p-6">
                  <h3 className="text-xl mb-6 text-gray-900">Statistics</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { value: '2,847', label: 'Total Records' },
                      { value: '156', label: 'Species' },
                      { value: '23', label: 'Families' },
                      { value: '8', label: 'Orders' }
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                        <div className="text-3xl text-[#1e3a8a] mb-2">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <h3 className="text-xl mb-6 text-gray-900">Matching Records</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Hilsa Fish', scientific: 'Tenualosa ilisha', records: 45 },
                      { name: 'Indian Mackerel', scientific: 'Rastrelliger kanagurta', records: 38 }
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
                <p className="text-gray-600 mb-6 max-w-md mx-auto">Upload your DNA sequence file</p>
                <input 
                  type="file" 
                  accept=".fasta,.fastq,.txt,.fa" 
                  onChange={(e) => { 
                    const f = e.target.files?.[0]; 
                    if (f) setEdnaUploadedFile(f); 
                  }} 
                  className="hidden" 
                  id="sequence-upload" 
                />
                <Button 
                  size="lg" 
                  className="bg-[#06b6d4] hover:bg-[#0891b2] text-white" 
                  onClick={() => document.getElementById('sequence-upload')?.click()}
                >
                  <Dna className="h-5 w-5 mr-2" />Choose File
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-gray-900">eDNA Results</h3>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setEdnaUploadedFile(null)} 
                      className="text-[#06b6d4] border-[#06b6d4]"
                    >
                      Upload New
                    </Button>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {['ID', 'Species', 'Confidence', 'Action'].map(header => (
                          <th key={header} className="px-6 py-3 text-left text-xs uppercase text-gray-500">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: 'DNA001', name: 'Tenualosa ilisha', confidence: 96.8 },
                        { id: 'DNA002', name: 'Rastrelliger kanagurta', confidence: 91.4 }
                      ].map((result, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{result.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{result.name}</td>
                          <td className="px-6 py-4">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {result.confidence}%
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="outline" size="sm" className="text-[#06b6d4] border-[#06b6d4]">View</Button>
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
                placeholder="Enter what you want to visualize..." 
                value={visualizeQuery} 
                onChange={(e) => setVisualizeQuery(e.target.value)} 
                className="text-lg p-6 pr-16 border-2 rounded-xl" 
              />
              <Button className="absolute right-3 top-3 bg-[#06b6d4] hover:bg-[#0891b2] rounded-lg" size="sm">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
            {visualizeQuery && (
              <div className="mt-8 p-6 bg-blue-50 rounded-xl max-w-2xl mx-auto">
                <p className="text-sm text-gray-600 text-center">For advanced visualizations, use the filters</p>
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
                <h3 className="text-xl text-gray-900">Predictive Visualization</h3>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />Export
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  { label: 'Temperature (°C)', value: tempValue, setter: setTempValue, min: -5, max: 35 },
                  { label: 'Salinity (ppt)', value: salinityValue, setter: setSalinityValue, min: 0, max: 45 },
                  { label: 'pH Level', value: phValue, setter: setPhValue, min: 6, max: 9 },
                  { label: 'Oxygen (mg/L)', value: oxygenValue, setter: setOxygenValue, min: 0, max: 15 }
                ].map((param, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-3">
                      <Label>{param.label}</Label>
                      <span className="text-sm text-gray-600">{param.value.toFixed(1)}</span>
                    </div>
                    <input 
                      type="range" 
                      min={param.min} 
                      max={param.max} 
                      step="0.1" 
                      value={param.value} 
                      onChange={(e) => param.setter(parseFloat(e.target.value))} 
                      className="w-full h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg appearance-none cursor-pointer" 
                    />
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 flex flex-col items-center justify-center">
                <div className="text-center mb-6">
                  <TrendingUp className="h-16 w-16 text-[#06b6d4] mx-auto mb-4" />
                  <h4 className="text-lg mb-2 text-gray-900">Survival Prediction</h4>
                </div>
                <div className="bg-white rounded p-6 w-full max-w-sm">
                  <div className="text-center">
                    <span className="text-4xl text-green-600">{calculateSurvival()}%</span>
                    <p className="text-sm text-gray-600 mt-2">Predicted Survival Rate</p>
                  </div>
                  <ResponsiveContainer width="100%" height={150} className="mt-4">
                    <LineChart data={biomassData.slice(0, 4)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis hide />
                      <Tooltip />
                      <Line type="monotone" dataKey="biomass" stroke="#06b6d4" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
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
                <h3 className="text-xl text-gray-900">Species Comparison</h3>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />Export
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="param" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hilsa" fill="#06b6d4" name="Hilsa" />
                <Bar dataKey="mackerel" fill="#0891b2" name="Mackerel" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      );
    }

    if (visualizationType === 'ecology') {
      if (!ecologyType) {
        return (
          <Card>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Activity className="h-6 w-6 mr-3 text-[#06b6d4]" />
                <h3 className="text-xl text-gray-900">Ecological Analysis</h3>
              </div>
              <p className="text-gray-600">Select an analysis type from the filters</p>
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
                  <h3 className="text-xl text-gray-900">{parameter1} vs {parameter2}</h3>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />Export
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="param" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hilsa" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="mackerel" stroke="#0891b2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        );
      }

      if (ecologyType && ecologyType !== 'parameter-comparison') {
        const paramName = ecologyType.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Activity className="h-6 w-6 mr-3 text-[#06b6d4]" />
                  <h3 className="text-xl text-gray-900">{paramName} Analysis</h3>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />Export
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg mb-4 text-gray-900">{paramName} Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="location" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="density" fill="#06b6d4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg mb-4 text-gray-900">Temporal Trends</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={trendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                <h4 className="text-lg mb-4 text-gray-900">Biomass Correlation</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={biomassData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="biomass" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        );
      }
    }

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
                <Download className="h-4 w-4 mr-2" />Export
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                <h4 className="text-lg mb-4 text-gray-900">Population Trends</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                <h4 className="text-lg mb-4 text-gray-900">Geographic Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="density" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
              <h4 className="text-lg mb-4 text-gray-900">Species Composition</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie 
                    data={speciesData} 
                    dataKey="count" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    label
                  >
                    {speciesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg text-gray-500">Select visualization options</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg border">
            <div className="flex">
              {[
                { mode: 'search' as PageMode, icon: Search, label: 'Search' },
                { mode: 'visualization' as PageMode, icon: BarChart3, label: 'Visualization' }
              ].map(item => (
                <button 
                  key={item.mode} 
                  onClick={() => { setPageMode(item.mode); resetFilters(); }} 
                  className={`flex items-center px-8 py-3 rounded-full transition-all ${
                    pageMode === item.mode ? 'bg-[#06b6d4] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-2" />{item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <div className="bg-white rounded-full p-1 shadow-md border">
            <div className="flex">
              {[
                { src: 'uploaded' as DataSource, label: 'Uploaded Data' },
                { src: 'platform' as DataSource, label: 'Platform Data' },
                { src: 'select' as DataSource, label: 'Select Source' }
              ].map(source => (
                <button 
                  key={source.src} 
                  onClick={() => setDataSource(source.src)} 
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    dataSource === source.src ? 'bg-[#1e3a8a] text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {source.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-4 shadow-md">
              <div className="p-6">
                <h3 className="text-lg mb-6 text-gray-900 flex items-center">
                  <div className="w-2 h-2 bg-[#06b6d4] rounded-full mr-3"></div>Filters
                </h3>
                <div className="space-y-6">
                  <div>
                    <Label className="text-base mb-3 block">Type</Label>
                    {pageMode === 'search' ? (
                      <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {['otolith', 'taxonomy', 'edna'].map(type => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select value={visualizationType} onValueChange={setVisualizationType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {['simulation', 'ecology', 'species'].map(type => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {pageMode === 'search' && searchType === 'otolith' && (
                    <div>
                      <Label className="text-base mb-3 block">Otolith Type</Label>
                      <Select value={otolithType} onValueChange={setOtolithType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
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
                      <Label className="text-base mb-3 block">Method</Label>
                      <Select value={taxonomyType} onValueChange={setTaxonomyType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="species">By Species</SelectItem>
                          <SelectItem value="class">By Classification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {pageMode === 'visualization' && visualizationType === 'simulation' && (
                    <div>
                      <Label className="text-base mb-3 block">Simulation</Label>
                      <Select value={simulationType} onValueChange={setSimulationType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="predictive">Predictive</SelectItem>
                          <SelectItem value="comparison">Comparison</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {pageMode === 'visualization' && visualizationType === 'ecology' && (
                    <div>
                      <Label className="text-base mb-3 block">Analysis</Label>
                      <Select value={ecologyType} onValueChange={setEcologyType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {['temperature', 'salinity', 'current-speed', 'depth', 'turbidity', 'parameter-comparison'].map(type => (
                            <SelectItem key={type} value={type}>
                              {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {pageMode === 'visualization' && visualizationType === 'ecology' && ecologyType === 'parameter-comparison' && (
                    <>
                      {['parameter1', 'parameter2'].map((param, index) => (
                        <div key={param}>
                          <Label className="text-base mb-3 block">Parameter {index + 1}</Label>
                          <Select 
                            value={index === 0 ? parameter1 : parameter2} 
                            onValueChange={index === 0 ? setParameter1 : setParameter2}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {['temperature', 'salinity', 'depth', 'ph', 'oxygen'].map(type => (
                                <SelectItem key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </>
                  )}

                  <Separator />

                  <div>
                    <Label className="text-base mb-3 block">Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {['Bay of Bengal', 'Arabian Sea', 'Indian Ocean', 'Kerala Coast'].map(loc => (
                          <SelectItem key={loc} value={loc.toLowerCase().replace(/ /g, '-')}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base mb-3 block">Time Period</Label>
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {['Last Month', 'Last 3 Months', 'Last Year', 'All Time'].map(period => (
                          <SelectItem key={period} value={period.toLowerCase().replace(/ /g, '-')}>
                            {period}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4">
            {pageMode === 'search' ? renderSearchContent() : renderVisualizationContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
