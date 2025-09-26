import { Database, HardDrive, Fish, Globe, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Database,
    value: "1,200+",
    label: "Total Datasets Unified",
    description: "Comprehensive marine data repositories"
  },
  {
    icon: HardDrive,
    value: "25+ TB",
    label: "Terabytes of Data",
    description: "Verified oceanographic information"
  },
  {
    icon: Fish,
    value: "80,000+",
    label: "Identified Species",
    description: "Marine biodiversity catalog"
  },
  {
    icon: Globe,
    value: "15+",
    label: "Repositories Integrated",
    description: "Global data source network"
  },
  {
    icon: TrendingUp,
    value: "68/100",
    label: "Ecosystem Health Index",
    description: "Current marine ecosystem status"
  }
];

export function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#1e3a8a] mb-4">
            Trusted by the Global Marine Research Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform scale demonstrates the trust and reliability researchers worldwide place in AquaCore
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#06b6d4] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl text-[#1e3a8a] mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-[#1e3a8a] mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}