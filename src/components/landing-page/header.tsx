"use client";

import { Truck, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdown = (item: string) => {
    setActiveDropdown(activeDropdown === item ? null : item);
  };

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-primary p-1.5 rounded-md mr-3">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-black">
            CourrierPlus
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <div className="relative">
            <button
              className="flex items-center text-gray-600 hover:text-black font-medium transition-colors text-sm"
              onClick={() => handleDropdown('products')}
            >
              Products
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {activeDropdown === 'products' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Payment Processing</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Marketplace</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Banking</a>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              className="flex items-center text-gray-600 hover:text-black font-medium transition-colors text-sm"
              onClick={() => handleDropdown('usecases')}
            >
              Use cases
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {activeDropdown === 'usecases' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">E-commerce</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Marketplaces</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">SaaS</a>
              </div>
            )}
          </div>
          
          <a href="#" className="text-gray-600 hover:text-black font-medium transition-colors text-sm">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-black font-medium transition-colors text-sm">
            Documentation
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button variant="outline" className="font-medium text-sm border-gray-300 text-gray-600 hover:text-black hover:border-gray-400">
            Contact sales
          </Button>
          <div className="relative">
            <button
              className="flex items-center text-gray-600 hover:text-black font-medium transition-colors text-sm"
              onClick={() => handleDropdown('more')}
            >
              More
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {activeDropdown === 'more' && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">About</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Blog</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Support</a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 lg:hidden">
            <nav className="flex flex-col p-6 space-y-4">
              <div className="space-y-2">
                <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 font-medium">
                  Products
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 font-medium">
                  Use cases
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Pricing
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Documentation
              </a>
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <Button variant="outline" className="w-full font-medium">
                  Contact sales
                </Button>
                <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 font-medium">
                  More
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
