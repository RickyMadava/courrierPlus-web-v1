"use client";

import { Truck, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Truck className="h-6 w-6 text-primary-foreground" />
          </div>

          <span className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-200 text-transparent bg-clip-text">
            CourrierPlus
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#accueil"
            className="text-foreground hover:text-primary transition-smooth"
          >
            Accueil
          </a>
          <a
            href="#services"
            className="text-foreground hover:text-primary transition-smooth"
          >
            Services
          </a>
          <a
            href="#suivi"
            className="text-foreground hover:text-primary transition-smooth"
          >
            Suivi
          </a>
          <a
            href="#contact"
            className="text-foreground hover:text-primary transition-smooth"
          >
            Contact
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline">Connexion</Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            Démarrer
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
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
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <a
                href="#accueil"
                className="text-foreground hover:text-primary transition-smooth"
              >
                Accueil
              </a>
              <a
                href="#services"
                className="text-foreground hover:text-primary transition-smooth"
              >
                Services
              </a>
              <a
                href="#suivi"
                className="text-foreground hover:text-primary transition-smooth"
              >
                Suivi
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-smooth"
              >
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="w-full">
                  Connexion
                </Button>
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-smooth">
                  Démarrer
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
