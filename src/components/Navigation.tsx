import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import asLogo from '@/assets/as-logo.png';

interface NavigationProps {
  language: string;
  onLanguageChange?: (lang: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = {
    es: [
      { href: "#hero", label: "Inicio" },
      { href: "#servicios", label: "Servicios" },
      { href: "#estilos", label: "Estilos" },
      { href: "#equipo", label: "Equipo" },
      { href: "#blog", label: "Blog" },
      { href: "#reserva", label: "Reserva" },
      { href: "#contacto", label: "Contacto" }
    ],
    en: [
      { href: "#hero", label: "Home" },
      { href: "#servicios", label: "Services" },
      { href: "#estilos", label: "Styles" },
      { href: "#equipo", label: "Team" },
      { href: "#blog", label: "Blog" },
      { href: "#reserva", label: "Book" },
      { href: "#contacto", label: "Contact" }
    ]
  };

  const currentNav = navItems[language as keyof typeof navItems];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-responsive">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={asLogo} 
                alt="AS Barbería" 
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-bold text-copper tracking-tight">AS</span>
              <span className="text-sm font-semibold text-primary tracking-wide">Barbería</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentNav.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <select
                value={language}
                onChange={(e) => onLanguageChange?.(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="es">ES</option>
                <option value="en">EN</option>
              </select>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="py-4 space-y-2">
              {currentNav.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-smooth"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;