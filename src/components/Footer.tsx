import { Waves, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1e3a8a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Waves className="h-8 w-8 text-[#06b6d4]" />
              <span className="text-xl tracking-wide">AquaCore</span>
            </div>
            <p className="text-gray-300 mb-4">
              Unifying the world's marine data for scientific discovery and ocean conservation.
            </p>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-gray-300 hover:text-[#06b6d4] cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-[#06b6d4] cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-[#06b6d4] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#search" className="hover:text-[#06b6d4] transition-colors">Search & Visualization</a></li>
              <li><a href="#analysis" className="hover:text-[#06b6d4] transition-colors">Analysis Tools</a></li>
              <li><a href="#api" className="hover:text-[#06b6d4] transition-colors">API Access</a></li>
              <li><a href="#upload" className="hover:text-[#06b6d4] transition-colors">Data Upload</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#docs" className="hover:text-[#06b6d4] transition-colors">Documentation</a></li>
              <li><a href="#tutorials" className="hover:text-[#06b6d4] transition-colors">Tutorials</a></li>
              <li><a href="#support" className="hover:text-[#06b6d4] transition-colors">Support</a></li>
              <li><a href="#community" className="hover:text-[#06b6d4] transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@aquacore.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Marine Research Institute</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 AquaCore. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-300">
              <a href="#privacy" className="hover:text-[#06b6d4] transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-[#06b6d4] transition-colors">Terms of Service</a>
              <div className="flex items-center space-x-1">
                <span>Adheres to</span>
                <a href="#fair" className="text-[#06b6d4] hover:underline">FAIR Principles</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}