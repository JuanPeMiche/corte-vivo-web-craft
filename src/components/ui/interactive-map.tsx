import React, { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  address: string;
  businessName: string;
  language: string;
  lat: number;
  lng: number;
  /** Link corto de Google Maps del local, si existe. */
  mapsUrl?: string;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  address,
  businessName,
  language,
  lat,
  lng,
  mapsUrl: mapsUrlProp,
  className = ""
}) => {
  const [isInteractive, setIsInteractive] = useState(false);

  const content = {
    es: {
      title: "Nuestra Ubicación",
      clickToInteract: "Hacé clic para interactuar con el mapa",
      getDirections: "Cómo llegar",
      viewInMaps: "Ver en Google Maps",
      openInApp: "Abrir en Google Maps"
    },
    en: {
      title: "Our Location",
      clickToInteract: "Click to interact with the map",
      getDirections: "Get Directions", 
      viewInMaps: "View in Google Maps",
      openInApp: "Open in Google Maps"
    }
  };

  const text = content[language as keyof typeof content] || content.es;

  // Mapa embebido centrado en las coordenadas reales de la sucursal.
  // Se usa el modo `q=lat,lng` porque no requiere API key ni el token `pb` interno de Google.
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=16&hl=${language}&output=embed`;

  // URLs para direcciones y vista en Google Maps
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const mapsUrl = mapsUrlProp || `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  const handleMapClick = () => {
    setIsInteractive(true);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h4 className="font-semibold flex items-center gap-2 text-lg">
        <MapPin className="w-5 h-5 text-copper" />
        {text.title}
      </h4>
      
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg border border-border bg-gray-100">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${text.title} - ${businessName}`}
          className="absolute inset-0"
        />
        
        {/* Overlay para control de interacción */}
        {!isInteractive && (
          <div 
            className="absolute inset-0 bg-black/20 cursor-pointer flex items-center justify-center transition-opacity hover:bg-black/30"
            onClick={handleMapClick}
            onTouchStart={handleMapClick}
          >
            <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-lg shadow-lg border border-gray-200 flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-copper" />
              {text.clickToInteract}
            </div>
          </div>
        )}
        
        {/* Indicador de carga */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-600 shadow">
          Google Maps
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex flex-wrap gap-3">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-copper text-white rounded-lg hover:bg-copper/90 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
        >
          <MapPin className="w-4 h-4" />
          {text.getDirections}
        </a>
        
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-copper text-copper rounded-lg hover:bg-copper/10 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
        >
          <ExternalLink className="w-4 h-4" />
          {text.viewInMaps}
        </a>
        
        {/* Botón para abrir en la app de Google Maps (móviles) */}
        <a
          href={`comgooglemaps://?q=${lat},${lng}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md md:hidden"
        >
          <MapPin className="w-4 h-4" />
          {text.openInApp}
        </a>
      </div>
      
      {/* Información adicional */}
      <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg border">
        <p className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 text-copper flex-shrink-0" />
          <span>{address}</span>
        </p>
      </div>
    </div>
  );
};

export default InteractiveMap;