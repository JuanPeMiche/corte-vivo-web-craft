import React, { useEffect, useRef, useState } from 'react';

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

/** Colores del sitio, para que el widget no abra en blanco. */
const TEMA = {
  background_color: '1a1a1a',
  text_color: 'ffffff',
  primary_color: 'c9884a',
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

/**
 * Carga widget.js una sola vez por página y devuelve su estado. Varias tarjetas
 * pueden pedirlo a la vez sin duplicar el <script>.
 */
function useCalendlyScript() {
  const [estado, setEstado] = useState<'cargando' | 'listo' | 'error'>(() =>
    typeof window !== 'undefined' && window.Calendly ? 'listo' : 'cargando',
  );

  useEffect(() => {
    if (window.Calendly) {
      setEstado('listo');
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    const ok = () => setEstado('listo');
    const fail = () => setEstado('error');
    script.addEventListener('load', ok);
    script.addEventListener('error', fail);
    return () => {
      script?.removeEventListener('load', ok);
      script?.removeEventListener('error', fail);
    };
  }, []);

  return estado;
}

/** Aplica los colores del sitio respetando los que ya traiga la URL. */
function urlConTema(url: string): string {
  try {
    const u = new URL(url);
    for (const [clave, valor] of Object.entries(TEMA)) {
      if (!u.searchParams.has(clave)) u.searchParams.set(clave, valor);
    }
    return u.toString();
  } catch {
    return url;
  }
}

interface CalendlyInlineProps {
  url: string;
  nombre: string;
}

const CalendlyInline: React.FC<CalendlyInlineProps> = ({ url, nombre }) => {
  const contenedor = useRef<HTMLDivElement>(null);
  const estado = useCalendlyScript();
  const urlFinal = urlConTema(url);

  useEffect(() => {
    if (estado !== 'listo' || !contenedor.current || !window.Calendly) return;
    // initInlineWidget agrega un iframe; se limpia antes por si cambió la URL.
    const nodo = contenedor.current;
    nodo.innerHTML = '';
    window.Calendly.initInlineWidget({
      url: urlFinal,
      parentElement: nodo,
    });
    // initInlineWidget no le pone altura al iframe que inserta: sin esto queda
    // en ~150px y el calendario aparece recortado.
    const iframe = nodo.querySelector('iframe');
    if (iframe) {
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = '0';
    }
  }, [estado, urlFinal]);

  return (
    <div>
      <div
        ref={contenedor}
        className="h-[700px] w-full overflow-hidden rounded-xl border border-border bg-card"
        aria-label={`Calendario de reservas de ${nombre}`}
      >
        {estado === 'cargando' && (
          <p className="p-6 text-center text-sm text-muted-foreground">Cargando calendario…</p>
        )}
        {estado === 'error' && (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No pudimos cargar el calendario.
          </p>
        )}
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        ¿No carga el calendario?{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-copper underline underline-offset-4"
        >
          Abrilo en una pestaña nueva
        </a>
        .
      </p>
    </div>
  );
};

export default CalendlyInline;
