# Yamir Rojo · Portafolio ejecutivo

Sitio profesional orientado a empresas, dirección de operaciones, logística y Supply Chain. Construido con Astro, React, TypeScript y CSS adaptable, con contenido en español e inglés.

## Desarrollo local

Requiere Node.js 22 o superior.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Abrir [localhost:4321](http://localhost:4321). También se puede usar `pnpm install` y `pnpm dev --host 127.0.0.1`.

## Validación

```sh
npm run check
```

## Contenido y recursos

- La nueva interfaz está en `src/components/react/ExecutivePortfolio.tsx` y `src/styles/globals.css`.
- La trayectoria y las credenciales se editan en `src/content/es.ts` y `src/content/en.ts`.
- Los datos de contacto y el documento descargable se configuran en `src/config/site.ts`.
- La galería usa `src/content/gallery.manifest.json`; sus traducciones mantienen el mismo orden en `src/content/gallery.en.ts`.
- El perfil ejecutivo público está en `public/documents/yamir-rojo-perfil-ejecutivo.pdf`.

Para regenerar el PDF desde el contenido del sitio, ejecutar `node scripts/export-profile-content.mjs` y luego `python scripts/build-profile.py`. El segundo comando requiere ReportLab. Para regenerar la imagen social, ejecutar `node scripts/build-social-image.mjs`.

Las métricas y fechas corresponden a la información profesional entregada. La formación declarada en curso conserva ese estado hasta contar con confirmación de titulación.


Copyright y Licencia
Copyright (c) 2026 Yamir Rojo. Todos los derechos reservados.

El código fuente de este portafolio está disponible únicamente con fines de visualización y evaluación de mi perfil profesional. No se otorga permiso para copiar, modificar, distribuir, ni utilizar este código, ya sea total o parcialmente, para ningún otro propósito sin mi consentimiento previo por escrito.
