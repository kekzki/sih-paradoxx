import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ExternalLink, Database, Clock, BarChart } from "lucide-react";

const dataSources = [
  {
    name: "INCOIS",
    logo: "🌊",
    dataType: "Oceanographic Parameters",
    updateFrequency: "Real-time",
    totalVolume: "2.5 TB",
    description: "Indian National Centre for Ocean Information Services providing comprehensive oceanographic data including temperature, salinity, and current measurements."
  },
  {
    name: "NIOT",
    logo: "🔬",
    dataType: "Deep Sea Research",
    updateFrequency: "Weekly",
    totalVolume: "1.8 TB",
    description: "National Institute of Ocean Technology specializing in deep-sea mining, underwater vehicles, and ocean engineering data."
  },
  {
    name: "OBIS",
    logo: "🐠",
    dataType: "Biodiversity Records",
    updateFrequency: "Daily",
    totalVolume: "5.2 TB",
    description: "Ocean Biodiversity Information System providing global marine species occurrence and abundance data."
  },
  {
    name: "GBIF",
    logo: "🌍",
    dataType: "Species Occurrence",
    updateFrequency: "Daily",
    totalVolume: "3.1 TB",
    description: "Global Biodiversity Information Facility offering comprehensive biodiversity data from marine environments worldwide."
  },
  {
    name: "CMLRE",
    logo: "⚡",
    dataType: "Marine Energy",
    updateFrequency: "Hourly",
    totalVolume: "1.2 TB",
    description: "Centre for Marine Living Resources & Ecology providing data on marine renewable energy and ecosystem dynamics."
  }
];

export function DataSourcesSection() {
  const [selectedSource, setSelectedSource] = useState<typeof dataSources[0] | null>(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Data Sources */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[#1e3a8a] mb-4">
              Trusted Data Sources
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Integrated with leading marine research institutions and databases worldwide
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {dataSources.map((source, index) => (
              <button
                key={index}
                onClick={() => setSelectedSource(source)}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group min-w-[120px]"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {source.logo}
                </div>
                <div className="text-[#1e3a8a] group-hover:text-[#06b6d4] transition-colors">
                  {source.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* API CTA */}
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl mb-4">
            Integrate AquaCore Data into Your Workflow
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Access our comprehensive marine datasets through our robust API. 
            Built for researchers, by researchers, following FAIR data principles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#06b6d4] hover:bg-[#0891b2] text-white px-8 py-3"
            >
              Get API Access
            </Button>
            <Button 
              size="lg" 
              className="bg-[#06b6d4] hover:bg-[#0891b2] text-white px-8 py-3"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              API Documentation
            </Button>
          </div>
        </div>

        {/* Data Source Modal */}
        <Dialog open={!!selectedSource} onOpenChange={() => setSelectedSource(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-[#1e3a8a]">
                <span className="text-2xl">{selectedSource?.logo}</span>
                {selectedSource?.name}
              </DialogTitle>
              <DialogDescription>
                Detailed information about this data source and its API access methods.
              </DialogDescription>
            </DialogHeader>
            
            {selectedSource && (
              <div className="space-y-4">
                <p className="text-gray-600">{selectedSource.description}</p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Database className="h-5 w-5 text-[#06b6d4]" />
                    <div>
                      <div className="text-sm text-gray-600">Data Type</div>
                      <div className="text-[#1e3a8a]">{selectedSource.dataType}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-[#06b6d4]" />
                    <div>
                      <div className="text-sm text-gray-600">Update Frequency</div>
                      <div className="text-[#1e3a8a]">{selectedSource.updateFrequency}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <BarChart className="h-5 w-5 text-[#06b6d4]" />
                    <div>
                      <div className="text-sm text-gray-600">Total Volume</div>
                      <div className="text-[#1e3a8a]">{selectedSource.totalVolume}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}