import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import asLogo from '@/assets/as-logo.png';

interface NavigationProps {
  language: string;
  onLanguageChange?: (lang: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#hero", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#estilos", label: "Estilos" },
    { href: "#reserva", label: "Reserva" },
    { href: "#contacto", label: "Contacto" },
    { href: "#sucursales", label: "Sucursales" }
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (window.location.pathname !== '/') {
      window.location.href = '/' + href;
    } else {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.querySelector(href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-responsive px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center group">
            <img
              src={asLogo}
              alt="AS Barbería"
              className="w-14 h-14 transition-transform duration-300 motion-safe:group-hover:scale-110"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
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
