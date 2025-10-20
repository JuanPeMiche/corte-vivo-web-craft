# 📝 Guía: Cambiar Nombre del Proyecto

## 🔄 Pasos para Renombrar de "corte-vivo-web-craft" a "web-as-barberia"

### 1. 📂 Cambios en el Código (✅ Ya Realizados)
- [x] Actualizado `package.json` con nuevo nombre y metadatos
- [x] Actualizado `README.md` con información del nuevo proyecto
- [x] Creado `vercel.json` con configuración optimizada
- [x] Actualizado `DEPLOYMENT.md`

### 2. 🐙 Renombrar Repositorio en GitHub

#### Opción A: Renombrar el repositorio actual (Recomendado)
```bash
# 1. Ve a GitHub.com → tu repositorio
# 2. Clic en "Settings" 
# 3. Scroll hasta "Repository name"
# 4. Cambiar de "corte-vivo-web-craft" a "web-as-barberia"
# 5. Clic "Rename"
```

#### Opción B: Crear nuevo repositorio
```bash
# 1. Crea nuevo repo en GitHub llamado "web-as-barberia"
# 2. En tu terminal local:
git remote set-url origin https://github.com/JuanPeMiche/web-as-barberia.git
git push -u origin main
```

### 3. 🚀 Actualizar Vercel

#### Si renombraste el repositorio:
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Encuentra tu proyecto "corte-vivo-web-craft"
3. Clic en "Settings" → "General"
4. En "Project Name" cambiar a "web-as-barberia"
5. El despliegue seguirá funcionando automáticamente

#### Si creaste nuevo repositorio:
1. En Vercel: "Add New..." → "Project"
2. Importar desde GitHub: "web-as-barberia"
3. Configurar:
   - Project Name: `web-as-barberia`
   - Framework: `Vite`
   - Build Command: `npm run build:prod`
   - Output Directory: `dist`
4. Deploy

### 4. 🔄 Comandos para Actualizar Local

```bash
# Si renombraste el repositorio en GitHub:
cd c:\Users\juanp\source\repos\corte-vivo-web-craft
git remote set-url origin https://github.com/JuanPeMiche/web-as-barberia.git

# Verificar que cambió:
git remote -v

# Push de los cambios actuales:
git add .
git commit -m "🎯 Renombrar proyecto a web-as-barberia"
git push
```

### 5. 📁 Renombrar Carpeta Local (Opcional)

```bash
# En el explorador de archivos o terminal:
cd c:\Users\juanp\source\repos\
move corte-vivo-web-craft web-as-barberia
cd web-as-barberia
```

### 6. ⚙️ Verificar URLs

Después del cambio, tus URLs serán:
- **Repositorio**: `https://github.com/JuanPeMiche/web-as-barberia`
- **Vercel**: `https://web-as-barberia.vercel.app`
- **Dominio personalizado**: `https://asbarberia.uy` (si lo configuras)

### 7. 🔗 Actualizar Referencias

Una vez que cambies las URLs, actualizar en:
- [ ] README.md (ya actualizado)
- [ ] package.json (ya actualizado)
- [ ] Cualquier documentación externa
- [ ] Enlaces en redes sociales

## ✅ ¿Por qué estos cambios?

1. **Mejor SEO**: El nombre "web-as-barberia" es más descriptivo
2. **Profesional**: Refleja mejor el negocio
3. **Consistencia**: Coincide con el dominio futuro
4. **Organización**: Más fácil de encontrar y recordar

## 🆘 Solución de Problemas

### Error de permisos en Git:
```bash
git config --global user.email "tu@email.com"
git config --global user.name "Tu Nombre"
```

### Vercel no detecta cambios:
- Ve a "Deployments" → "Redeploy"
- O haz un push pequeño para triggear nuevo deploy

### Links rotos después del cambio:
- GitHub automáticamente redirige por un tiempo
- Actualiza bookmarks y referencias manualmente

---

🎉 **¡Listo!** Tu proyecto ahora se llama `web-as-barberia` y está mejor organizado para producción.