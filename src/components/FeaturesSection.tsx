import { Search, BarChart3, Radio, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    icon: Search,
    title: "Intelligent Data Discovery",
    description: "eDNA matching, otolith identification and semantic text search for precise species identification and research correlation.",

  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Uncover hidden trends using powerful AI models like XGBoost for correlation analysis across oceanographic and biodiversity datasets.",

  },
  {
    icon: Radio,
    title: "Real-Time Ocean Streams",
    description: "Access live sensor data from various national and global sources, providing up-to-the-minute oceanographic parameters.",

  },
  {
    icon: Code,
    title: "API Access & Integration",
    description: "Power external applications with direct API access to structured, validated datasets following FAIR principles.",

  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-[#1e3a8a]">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cutting-edge tools and technologies designed for marine research excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#1e3a8a] text-white group pb-6">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#06b6d4] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-200 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#06b6d4] to-transparent opacity-20 rounded-full transform translate-x-8 -translate-y-8"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}