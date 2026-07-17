#!/bin/bash
echo "🚀 Iniciando proceso de guardado y despliegue..."

# 1. Preparar archivos
git add .

# 2. Guardar cambios localmente
git commit -m "Actualización del sistema: $(date +'%Y-%m-%d %H:%M:%S')"

# 3. Subir a GitHub (con fuerza si es necesario para sincronizar)
git push origin main --force

# 4. Publicar TODO en Firebase (Hosting, Firestore Rules, etc.)
npx firebase deploy

echo "✅ ¡Todo listo! Tu aplicación completa y GitHub están sincronizados."
