# 🚀 Guía de Despliegue - AS Barbería (web-as-barberia)

## ✅ Checklist Pre-Producción

### 1. **Variables de Entorno**
```bash
# Copia .env.example a .env.production
cp .env.example .env.production

# Configura las variables reales:
VITE_APP_URL=https://tudominio.com
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_CONTACT_EMAIL=tu@email.com
```

### 2. **Build de Producción**
```bash
npm run build:prod
npm run preview  # Probar localmente
```

### 3. **Assets Necesarios**
Crear los siguientes iconos en `/public/assets/`:
- `icon-72.png` (72x72)
- `icon-96.png` (96x96)
- `icon-128.png` (128x128)
- `icon-144.png` (144x144)
- `icon-152.png` (152x152)
- `icon-192.png` (192x192)
- `icon-384.png` (384x384)
- `icon-512.png` (512x512)
- `og-image.jpg` (1200x630 para redes sociales)

### 4. **SSL Certificate**
- ✅ Configurar HTTPS
- ✅ Redirigir HTTP a HTTPS
- ✅ Configurar HSTS headers

### 5. **DNS Configuration**
```
A     @      IP_DEL_SERVIDOR
CNAME www    tudominio.com
```

### 6. **Hosting Recomendados**

#### **Netlify** (Recomendado para sitios estáticos)
```bash
# Deploy automático
npm run build
# Sube la carpeta dist/

# O conecta con Git para CI/CD automático
```

#### **Vercel**
```bash
npm install -g vercel
vercel --prod
```

#### **Hosting tradicional**
```bash
npm run build
# Sube el contenido de dist/ al servidor
```

### 7. **Configuraciones del Servidor**

#### **Apache (.htaccess)**
```apache
# Redirección HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Headers de seguridad
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Caché para recursos estáticos
<filesMatch "\.(css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$">
    ExpiresActive on
    ExpiresDefault "access plus 1 year"
</filesMatch>

# SPA Routing
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

#### **Nginx**
```nginx
server {
    listen 443 ssl http2;
    server_name tudominio.com www.tudominio.com;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$ {
        root /path/to/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    return 301 https://$server_name$request_uri;
}
```

### 8. **Monitoreo Post-Despliegue**

#### **Google Analytics**
```html
<!-- Ya configurado en index.html -->
```

#### **Google Search Console**
1. Verificar propiedad del sitio
2. Subir sitemap.xml
3. Monitorear errores de indexación

#### **Herramientas de Monitoreo**
- **UptimeRobot** - Monitoreo de disponibilidad
- **GTmetrix** - Performance
- **Google PageSpeed Insights** - Optimización
- **SSL Labs** - Verificar configuración SSL

### 9. **Backup Strategy**
```bash
# Backup automático (cron job)
0 2 * * * /usr/bin/rsync -av /path/to/website/ /backup/location/
```

### 10. **Legal Requirements**
- [ ] Política de Privacidad
- [ ] Términos y Condiciones
- [ ] Cookie Policy (si usas analytics)
- [ ] GDPR compliance (si tienes usuarios EU)

## 🔧 Comandos Útiles

```bash
# Análisis de bundle
npm run analyze

# Verificar tipos TypeScript
npm run type-check

# Lint y fix
npm run lint:fix

# Preview con HTTPS
npm run preview:https
```

## ⚠️ Notas Importantes

1. **Cambiar URLs hardcodeadas**: Buscar "asbarberia.uy" y reemplazar por tu dominio
2. **Actualizar contactos**: Email, teléfono, dirección en el código
3. **Google Analytics**: Reemplazar ID de ejemplo por el real
4. **Iconos sociales**: Actualizar enlaces de redes sociales
5. **Certificado SSL**: Obligatorio para PWA y credibilidad
6. **Coordenadas del mapa**: Actualizar latitud y longitud en `src/components/ui/interactive-map.tsx`

### 📍 Configurar Coordenadas del Mapa

Para obtener las coordenadas exactas de tu negocio:

1. Ve a [Google Maps](https://maps.google.com)
2. Busca tu dirección exacta
3. Haz clic derecho en la ubicación exacta
4. Selecciona "¿Qué hay aquí?"
5. Copia las coordenadas que aparecen
6. Actualiza en `src/components/ui/interactive-map.tsx`:

```typescript
const latitude = -34.9032727;  // Tu latitud
const longitude = -56.1947856; // Tu longitud
```

## 📊 Métricas a Monitorear

- **Performance**: Lighthouse Score > 90
- **SEO**: Lighthouse SEO > 95
- **Accessibility**: Lighthouse A11y > 90
- **Best Practices**: Lighthouse BP > 90
- **Uptime**: > 99.9%
- **Load Time**: < 3 segundos

¡Tu sitio estará listo para producción! 🎉