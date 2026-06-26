#!/bin/bash
echo "🚀 Iniciando proceso de guardado y despliegue..."

# 1. Preparar archivos
git add .

# 2. Guardar cambios localmente
git commit -m "Actualización final: Motor UK clava nóminas reales y Motor España PRO"

# 3. Subir a GitHub (con fuerza si es necesario para sincronizar)
git push origin main --force

# 4. Publicar en Firebase Hosting
npx firebase deploy --only hosting

echo "✅ ¡Todo listo! Tu web y GitHub están actualizados."
